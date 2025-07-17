import type { TRPCRouterRecord } from "@trpc/server";
import { protectedProcedure, publicProcedure } from "../trpc";

export const helloRouter = {
  hello: publicProcedure.query(() => {
    return "Hello from tRPC!";
  }),
  protectedHello: protectedProcedure.query(({ ctx }) => {
    return `Hello ${ctx.session.user.name} from tRPC! protected route`;
  }),
} satisfies TRPCRouterRecord;
