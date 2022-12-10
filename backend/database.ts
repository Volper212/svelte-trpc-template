import type { inferAsyncReturnType } from "@trpc/server";
import { MongoClient } from "mongodb";

export default async function getDatabase() {
    const client = await new MongoClient(
        process.env.MONGODB_URL ?? "mongodb://127.0.0.1:27017"
    ).connect();
    const database = client.db("coding");
    return {
        users: database.collection<User>("users"),
        sessions: database.collection<Session>("sessions"),
    };
}

export type Database = inferAsyncReturnType<typeof getDatabase>;

type User = {
    username: string;
    passwordHash: string;
};

type Session = {
    username: string;
    token: string;
};
