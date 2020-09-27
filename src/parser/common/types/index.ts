import { Store, LocalContext, GlobalContext } from "../../basic";

export interface Command {
    argsCount: number;
    routine: (
        args: string[],
        registerStore: Store,
        localContext: LocalContext,
        globalContext: GlobalContext
    ) => void;
}
