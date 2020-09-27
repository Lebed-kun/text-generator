import Store from "./store";
import { LocalContext, GlobalContext, StaticContext } from "./contexts";

type Microcommand = (
    registerNames: number[],
    registerStore: Store,
    localContext: LocalContext,
    globalContext: GlobalContext,
    staticContext: StaticContext,
) => void;

export default Microcommand;
