import { Error } from "@/lib/type";
import { brave } from "@/services";
import { TRPCError, type TRPCRouterRecord } from "@trpc/server";
import z from "zod";
import { protectedProcedure } from "../trpc";

export const braveRouter = {
  search: protectedProcedure
    .input(z.object({ q: z.string().nonempty("Search query is required") }))
    .mutation(async ({ input }) => {
      const { data, err } = await brave.searchWeb({ q: input.q });

      if (err) {
        console.error(Error.WEBSEARCH_ERROR, err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: err.message,
        });
      }

      return data;
    }),
} satisfies TRPCRouterRecord;
