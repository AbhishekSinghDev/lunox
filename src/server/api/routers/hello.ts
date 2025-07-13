import type { TRPCRouterRecord } from "@trpc/server";
import { publicProcedure } from "../trpc";

export const helloRouter = {
  hello: publicProcedure.query(() => {
    return "Hello from tRPC!";
  }),
} satisfies TRPCRouterRecord;
