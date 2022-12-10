import type { AwaitableReturnType } from "./util/AwaitableReturnType";
import getDatabase from "./database";
import makeGetLoggedIn from "./util/getLoggedIn";
import makeUserProcedure from "./util/userProdecure";

export async function prepareDependencies() {
    const database = await getDatabase();
    const getLoggedIn = makeGetLoggedIn(database);
    const userProcedure = makeUserProcedure(getLoggedIn);

    return {
        database,
        userProcedure,
        getLoggedIn,
    };
}

type Dependencies = AwaitableReturnType<typeof prepareDependencies>;

export default Dependencies;
