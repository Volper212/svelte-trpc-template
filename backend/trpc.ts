import { initTRPC, type AnyRouter } from "@trpc/server";
import {
    createExpressMiddleware,
    type CreateExpressContextOptions,
} from "@trpc/server/adapters/express";
import type { AwaitableReturnType } from "./util/AwaitableReturnType";

const createContext = (options: CreateExpressContextOptions) => options;
type Context = AwaitableReturnType<typeof createContext>;

export const {
    procedure: publicProcedure,
    router: makeRouter,
    middleware,
} = initTRPC.context<Context>().create();
export const makeTRPCExpressMiddleware = <Router extends AnyRouter>(router: Router) =>
    createExpressMiddleware({ router, createContext });
