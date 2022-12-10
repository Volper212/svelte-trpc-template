import { makeRouter, publicProcedure } from "backend/trpc";
import { z } from "zod";
import bcrypt from "bcrypt";
import { v4 as generateId } from "uuid";
import type Dependencies from "backend/dependencies";

const makeAuthenticationRouter = ({ database, userProcedure, getLoggedIn }: Dependencies) =>
    makeRouter({
        register: publicProcedure
            .input(
                z.object({
                    username: z.string(),
                    password: z.string(),
                })
            )
            .mutation(async ({ input: { username, password }, ctx: { res } }) => {
                if (await database.users.findOne({ username }))
                    return "Nazwa użytkownika jest zajęta";
                const token = generateId();
                await Promise.all([
                    database.users.insertOne({
                        username,
                        passwordHash: await bcrypt.hash(password, 10),
                    }),
                    database.sessions.insertOne({
                        username,
                        token,
                    }),
                ]);
                res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true });
            }),

        login: publicProcedure
            .input(
                z.object({
                    username: z.string(),
                    password: z.string(),
                })
            )
            .mutation(async ({ input: { username, password }, ctx: { res } }) => {
                const user = await database.users.findOne({ username });
                if (user == null || !(await bcrypt.compare(password, user.passwordHash)))
                    return "Niepoprawna nazwa użytkownika lub hasło";
                const token = generateId();
                await database.sessions.insertOne({
                    username,
                    token,
                });
                res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true });
            }),

        loggedInUser: publicProcedure.query(async ({ ctx }) => (await getLoggedIn(ctx))?.username),

        logout: userProcedure.mutation(async ({ ctx: { token, res } }) => {
            await database.sessions.deleteOne({ token });
            res.clearCookie("token");
        }),
    });

export default makeAuthenticationRouter;
