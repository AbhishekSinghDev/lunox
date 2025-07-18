import { tryCatch } from "@/lib/try-catch";
import { Error } from "@/lib/type";
import { library, libTypeEnum } from "@/server/db/schema";
import { TRPCError, type TRPCRouterRecord } from "@trpc/server";
import z from "zod";
import { protectedProcedure } from "../trpc";

export const libraryRouter = {
  create: protectedProcedure
    .input(
      z.object({
        message: z.string().nonempty("Message is required").trim(),
        type: z.enum(libTypeEnum.enumValues),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { err } = await tryCatch(
        ctx.db.insert(library).values({
          content: input.message,
          userId: ctx.session.user.id,
          type: input.type,
        }),
      );

      if (err) {
        console.error(Error.DATABASE_ERROR, err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create library entry",
        });
      }

      // in future spin a ingest task process for this query

      return {
        success: true,
      };
    }),
} satisfies TRPCRouterRecord;
