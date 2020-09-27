import Store from "./store";
import { LocalContext, GlobalContext } from "./contexts";

type Microcommand = (
    registerNames: number[],
    registerStore: Store,
    localContext: LocalContext,
    globalContext: GlobalContext
) => void;

export default Microcommand;
