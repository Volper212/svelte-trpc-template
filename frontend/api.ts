import type { Router } from "backend/app";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

export default createTRPCProxyClient<Router>({
    links: [
        httpBatchLink({
            url: "/trpc",
        }),
    ],
});
