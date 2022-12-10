import express from "express";
import { makeRouter, makeTRPCExpressMiddleware, publicProcedure, middleware } from "./trpc";
import dotenv from "dotenv";
import type { inferAsyncReturnType } from "@trpc/server";
import getDatabase from "./database";
import makeAuthenticationRouter from "./routers/authentication";
import makeUserProcedure from "./userProdecure";

async function main() {
    const database = await getDatabase();
    const userProcedure = makeUserProcedure(database);

    const router = makeRouter({
        authentication: makeAuthenticationRouter(database),
    });

    const app = express();
    app.use(express.static("frontend/public"));
    app.use("/trpc", makeTRPCExpressMiddleware(router));
    app.listen(process.env.PORT ?? 3000);

    return router;
}

dotenv.config();
main();

export type Router = inferAsyncReturnType<typeof main>;
