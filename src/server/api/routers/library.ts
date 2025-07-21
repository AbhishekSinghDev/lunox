import { tryCatch } from "@/lib/try-catch";
import { Error } from "@/lib/type";
import { library, libTypeEnum } from "@/server/db/schema";

import { inngest } from "@/inngest/client";
import { TRPCError, type TRPCRouterRecord } from "@trpc/server";
import { desc, eq } from "drizzle-orm";
import z from "zod";
import { protectedProcedure } from "../trpc";

export const libraryRouter = {
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const { data: threads, err: threadsFetchErr } = await tryCatch(
      ctx.db.query.library.findMany({
        where: eq(library.userId, ctx.session.user.id),
        orderBy: desc(library.createdAt),
      }),
    );

    if (threadsFetchErr) {
      console.error(Error.DATABASE_ERROR, threadsFetchErr);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch library threads",
      });
    }

    return threads;
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string().nonempty("Thread ID is required") }))
    .query(async ({ ctx, input }) => {
      const { data: thread, err: threadFetchErr } = await tryCatch(
        ctx.db.query.library.findFirst({
          where: eq(library.id, input.id),
          with: {
            conversations: true,
          },
        }),
      );

      if (threadFetchErr) {
        console.error(Error.DATABASE_ERROR, threadFetchErr);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch library thread",
        });
      }

      if (!thread) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Thread not found",
        });
      }

      return thread;
    }),

  create: protectedProcedure
    .input(
      z.object({
        message: z.string().nonempty("Message is required").trim(),
        type: z.enum(libTypeEnum.enumValues),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { data: libraryData, err } = await tryCatch(
        ctx.db
          .insert(library)
          .values({
            content: input.message,
            userId: ctx.session.user.id,
            type: input.type,
          })
          .returning(),
      );

      const libData = libraryData?.[0];

      if (err || !libData) {
        console.error(Error.DATABASE_ERROR, err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create library entry",
        });
      }

      if (input.type === "research") {
        // pending

        return {
          success: true,
          libId: libData.id,
          inngestId: null,
        };
      }

      const inngestRes = await inngest.send({
        name: "web-search-and-generate-llm-summary",
        data: {
          libId: libData.id,
          searchQuery: input.message,
        },
      });

      return {
        libId: libData.id,
        inngestId: inngestRes.ids[0],
      };
    }),
} satisfies TRPCRouterRecord;
