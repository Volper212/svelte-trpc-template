import { initTRPC, type AnyRouter, type inferAsyncReturnType } from "@trpc/server";
import {
    createExpressMiddleware,
    type CreateExpressContextOptions,
} from "@trpc/server/adapters/express";

const createContext = (options: CreateExpressContextOptions) => options;
type Context = inferAsyncReturnType<typeof createContext>;

export const { procedure: publicProcedure, router: makeRouter, middleware } = initTRPC
    .context<Context>()
    .create();
export const makeTRPCExpressMiddleware = <Router extends AnyRouter>(router: Router) =>
    createExpressMiddleware({ router, createContext });
