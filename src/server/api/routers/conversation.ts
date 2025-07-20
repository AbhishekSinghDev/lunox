import { inngest } from "@/inngest/client";
import type { TRPCRouterRecord } from "@trpc/server";
import z from "zod";
import { protectedProcedure } from "../trpc";

export const conversationRouter = {
  newMessage: protectedProcedure
    .input(
      z.object({
        libId: z.string().min(1, "Library ID is required"),
        userQuery: z.string().min(1, "User query is required"),
      }),
    )
    .mutation(async ({ input }) => {
      const inngestRes = await inngest.send({
        name: "web-search-and-generate-llm-summary",
        data: {
          libId: input.libId,
          searchQuery: input.userQuery,
        },
      });

      return {
        inngestId: inngestRes.ids[0],
      };
    }),
} satisfies TRPCRouterRecord;
