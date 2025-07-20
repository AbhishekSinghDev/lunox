import { Error } from "@/lib/type";
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
    // perform web search here
    const webSearchParsedResult = await step.run("web-search", async () => {
      const { data: searchRes, err: searchErr } = await brave.searchWeb({
        q: event.data.searchQuery,
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
            userQuery: event.data.searchQuery,
            webSearchResult: webSearchParsedResult,
            libId: event.data.libId,
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
          const { img, ...rest } = result;
          return rest;
        });

        return llmModifiedWebResult;
      },
    );

    // generate llm summary
    const summarizerAgent = createAgent({
      name: "summarizer-agent",
      system:
        "Depends on user input sources, Summerize and search about topic, Give me markdown text with proper formatting. User input is " +
        event.data.searchQuery,
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
