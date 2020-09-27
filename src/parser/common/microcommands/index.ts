import { MicrocommandNames } from "./types";
import { 
    Processor,
} from "../../basic";
import * as Microcommands from "./microcommands";

const processor: Processor = {
    [MicrocommandNames.PUSH]: Microcommands.push,
    [MicrocommandNames.CLEAR]: Microcommands.clear,
    [MicrocommandNames.PUSH_USING_LOCAL_CTX]: Microcommands.pushUsingLocalCtx,
    [MicrocommandNames.PUSH_USING_GLOBAL_CTX]: Microcommands.pushUsingGlobalCtx,
    [MicrocommandNames.POP]: Microcommands.pop,
    [MicrocommandNames.POP_ARGUMENTS]: Microcommands.popArguments,
    [MicrocommandNames.CALL]: Microcommands.call,
};

export default processor;
