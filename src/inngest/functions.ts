import { db } from "@/server/db";
import { conversation } from "@/server/db/schema";
import { createAgent, gemini } from "@inngest/agent-kit";
import { eq } from "drizzle-orm";
import { inngest } from "./client";

export const llmModelGenerateWebSearchSummary = inngest.createFunction(
  { id: "llm-model-generate-web-search-summary" },
  { event: "llm-model.web.search.summary" },
  async ({ event, step }) => {
    const summarizerAgent = createAgent({
      name: "summarizer-agent",
      system:
        "You are a summarizer agent. Your task is to summarize the provided web search results into a concise and informative summary. You can do web search and summarize the information in a markdown format. Provide proper markdown format.",
      model: gemini({
        model: "gemini-2.0-flash",
        defaultParameters: {
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: JSON.stringify(event.data.webSearchResults),
                },
              ],
            },
          ],
        },
      }),
    });

    const output = await summarizerAgent.run(
      "Summarize the web search results",
    );

    await step.run("save-to-database", async () => {
      await db
        .update(conversation)
        .set({
          aiResponse: output.raw,
        })
        .where(eq(conversation.id, event.data.conversationId));

      return { message: "Database updated successfully" };
    });

    return { message: "Web search summary generated successfully" };
  },
);
