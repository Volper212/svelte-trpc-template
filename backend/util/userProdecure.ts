import { TRPCError } from "@trpc/server";
import { publicProcedure, middleware } from "../trpc";
import type { GetLoggedIn } from "./getLoggedIn";

const makeUserProcedure = (getLoggedIn: GetLoggedIn) =>
    publicProcedure.use(
        middleware(async ({ ctx, next }) => {
            const loggedIn = await getLoggedIn(ctx);
            if (loggedIn === undefined) throw new TRPCError({ code: "UNAUTHORIZED" });
            return next({ ctx: loggedIn });
        })
    );

export default makeUserProcedure;
