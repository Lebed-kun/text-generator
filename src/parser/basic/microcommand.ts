import Store from "./store";
import { LocalContext, GlobalContext } from "./contexts";

type Microcommand = (
    registers: Store,
    localContext: LocalContext,
    globalContext: GlobalContext
) => void;

export default Microcommand;
