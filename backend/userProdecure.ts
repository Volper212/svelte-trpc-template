import { TRPCError } from "@trpc/server";
import type { Database } from "./database";
import { publicProcedure, middleware } from "./trpc";
import type * as TRPC from "@trpc/server/adapters/express";

export default function makeUserProcedure(database: Database) {
    const getLoggedIn = makeGetLoggedIn(database);

    return publicProcedure.use(
        middleware(async ({ ctx, next }) => {
            const loggedIn = await getLoggedIn(ctx);
            if (loggedIn === undefined) throw new TRPCError({ code: "UNAUTHORIZED" });
            return next({ ctx: loggedIn });
        })
    );
}

export const makeGetLoggedIn =
    (database: Database) =>
    async ({
        req: {
            headers: { cookie },
        },
    }: TRPC.CreateExpressContextOptions) => {
        if (cookie === undefined) return;
        const cookies = cookie.split("; ");
        const search = "token=";
        for (const cookie of cookies) {
            if (cookie.startsWith(search)) {
                const token = cookie.substring(search.length);
                const session = await database.sessions.findOne({ token });
                if (session == null) return;
                return {
                    username: session.username,
                    token,
                };
            }
        }
    };
