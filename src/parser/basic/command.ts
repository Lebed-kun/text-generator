import Store from "./store";
import { LocalContext, GlobalContext, StaticContext } from "./contexts";

interface Command {
    argsCount: number;
    routine: (
        localContext: LocalContext,
        globalContext: GlobalContext,
        staticContext: StaticContext,
        registersStore: Store
    ) => void;
}

export default Command;
