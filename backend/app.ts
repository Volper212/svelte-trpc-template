import express from "express";
import { makeRouter, makeTRPCExpressMiddleware } from "./trpc";
import dotenv from "dotenv";
import makeAuthenticationRouter from "./routers/authentication";
import { prepareDependencies } from "./dependencies";
import type { AwaitableReturnType } from "./util/AwaitableReturnType";

async function main() {
    const dependencies = await prepareDependencies();

    const router = makeRouter({
        authentication: makeAuthenticationRouter(dependencies),
    });

    const app = express();
    app.use(express.static("frontend/public"));
    app.use("/trpc", makeTRPCExpressMiddleware(router));
    app.listen(process.env.PORT ?? 3000);

    return router;
}

dotenv.config();
main();

export type Router = AwaitableReturnType<typeof main>;
