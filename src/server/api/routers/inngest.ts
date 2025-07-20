import { env } from "@/env";
import { tryCatch } from "@/lib/try-catch";
import { Error, type InngestRunResponse } from "@/lib/type";
import { TRPCError, type TRPCRouterRecord } from "@trpc/server";
import axios from "axios";
import z from "zod";
import { protectedProcedure } from "../trpc";

export const inngestRouter = {
  getRunById: protectedProcedure
    .input(z.object({ inngestId: z.string() }))
    .query(async ({ input }) => {
      const { data, err } = await tryCatch(
        axios.get<{ data: InngestRunResponse[] }>(
          `${env.INNGEST_API_HOST}/v1/events/${input.inngestId}/runs`,
          {
            headers: {
              Authorization: `Bearer ${env.INNGEST_SIGNING_KEY}`,
            },
          },
        ),
      );

      if (err) {
        console.error(Error.INNGEST_ERROR, err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch Inngest status",
        });
      }

      return data.data.data[0] ?? null;
    }),
} satisfies TRPCRouterRecord;
