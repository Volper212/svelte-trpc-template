import express from "express";
import { makeRouter, makeTRPCExpressMiddleware } from "./trpc";
import dotenv from "dotenv";
import type { inferAsyncReturnType } from "@trpc/server";
import getDatabase from "./database";
import makeAuthenticationRouter from "./routers/authentication";
import makeUserProcedure from "./util/userProdecure";
import makeGetLoggedIn from "./util/getLoggedIn";

async function main() {
    const database = await getDatabase();
    const getLoggedIn = makeGetLoggedIn(database);
    const userProcedure = makeUserProcedure(getLoggedIn);

    const router = makeRouter({
        authentication: makeAuthenticationRouter(database, userProcedure, getLoggedIn),
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
