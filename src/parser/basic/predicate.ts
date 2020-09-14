import Store from "./store";
import { LocalContext, GlobalContext } from "./contexts";

type Predicate = (
    registers: Store, 
    localContext: LocalContext, 
    globalContext: GlobalContext
) => boolean;

export default Predicate;
