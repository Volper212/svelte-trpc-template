import { MongoClient } from "mongodb";
import type { AwaitableReturnType } from "./util/AwaitableReturnType";

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

export type Database = AwaitableReturnType<typeof getDatabase>;

type User = {
    username: string;
    passwordHash: string;
};

type Session = {
    username: string;
    token: string;
};
