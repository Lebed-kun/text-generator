import Store from "./store";
import Register from "./register";
import { LocalContext, GlobalContext, StaticContext } from "./contexts";

interface Command {
    argsCount: number;
    routine: (
        argsRegister: Register<string[]>,
        returnRegister: Register<string>, 
        localContext: LocalContext,
        globalContext: GlobalContext,
        staticContext: StaticContext,
        registersStore: Store
    ) => void;
}

export default Command;
