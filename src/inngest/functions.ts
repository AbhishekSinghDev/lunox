import {
  Error,
  type InngestLlmModelGenerateWebSearchSummaryEventQuery,
} from "@/lib/type";
import { db } from "@/server/db";
import { conversation } from "@/server/db/schema";
import { parseSearchResults } from "@/server/utils";
import { brave } from "@/services";
import { createAgent, gemini } from "@inngest/agent-kit";
import { eq } from "drizzle-orm";
import { inngest } from "./client";

export const llmModelGenerateWebSearchSummary = inngest.createFunction(
  { id: "web-search-and-generate-llm-summary" },
  { event: "web-search-and-generate-llm-summary" },
  async ({ event, step }) => {
    const eventData =
      event.data as InngestLlmModelGenerateWebSearchSummaryEventQuery;

    // perform web search here
    const webSearchParsedResult = await step.run("web-search", async () => {
      const { data: searchRes, err: searchErr } = await brave.searchWeb({
        q: eventData.searchQuery,
        count: 5,
      });

      if (searchErr) {
        console.error(Error.WEBSEARCH_ERROR, searchErr);
        return null;
      }

      const webResult = parseSearchResults(searchRes);
      return webResult;
    });

    if (!webSearchParsedResult) {
      return {
        message: "Failed to search web.",
      };
    }

    const saveResult = await step.run(
      "save-to-db-web-search-result",
      async () => {
        const convoRes = await db
          .insert(conversation)
          .values({
            userQuery: eventData.searchQuery,
            webSearchResult: webSearchParsedResult,
            libId: eventData.libId,
          })
          .returning();

        const convoId = convoRes[0]?.id;

        if (!convoId) {
          return {
            error: true,
            convoId: null,
            message: "Failed to save web search result to database.",
          };
        }

        return {
          error: false,
          convoId: convoId,
          message: "Web search results saved to database successfully.",
        };
      },
    );

    if (saveResult.error || !saveResult.convoId) {
      return saveResult.message;
    }

    const llmModifiedWebResult = await step.run(
      "optimize-web-search-result-for-llm",
      () => {
        const llmModifiedWebResult = webSearchParsedResult.map((result) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { img, ...rest } = result;
          return rest;
        });

        return llmModifiedWebResult;
      },
    );

    // generate llm summary
    const summarizerAgent = createAgent({
      name: "summarizer-agent",
      system: `You are Lunox.ai, an intelligent AI assistant. A user has asked you: "${eventData.searchQuery}"

You need to perform web search to gather current information about this topic. Based on your web search findings, provide a comprehensive and helpful response directly answering the user's question.

Guidelines:
- Respond naturally as if you're directly answering the user's question
- Use the web search data to provide accurate, up-to-date information
- Format your response in clean markdown with proper headings, bullet points, and emphasis where appropriate
- Be conversational but informative
- Don't mention that you're summarizing web results or reviewing provided information
- Don't use phrases like "Based on the search results" or "Here's a summary"
- Answer as if you naturally know this information from your web search capabilities
- Structure your response logically with clear sections when dealing with complex topics`,
      model: gemini({
        model: "gemini-2.0-flash",
        defaultParameters: {
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: JSON.stringify(llmModifiedWebResult),
                },
              ],
            },
          ],
        },
      }),
    });

    const aiResponse = await summarizerAgent.run("Generate Summary");

    await step.run("save-to-db-ai-response", async () => {
      await db
        .update(conversation)
        .set({
          aiResponse: aiResponse.raw,
        })
        .where(eq(conversation.id, saveResult.convoId));

      return { message: "AI response saved to database successfully" };
    });

    return { message: "Web search and AI summary generated successfully" };
  },
);
