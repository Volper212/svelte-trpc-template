import type { Database } from "../database";
import type * as TRPC from "@trpc/server/adapters/express";

const makeGetLoggedIn =
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

export default makeGetLoggedIn;

export type GetLoggedIn = ReturnType<typeof makeGetLoggedIn>;
