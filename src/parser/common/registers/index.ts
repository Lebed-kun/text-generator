import { RegisterNames } from "./types";
import { Store, Register } from "../../basic";

const registers: Store = {
    [RegisterNames.INPUT_STREAM]: new Register<string>(),
    [RegisterNames.INPUT_POINTER]: new Register<number>(0),

    [RegisterNames.OUTPUT_STREAM]: new Register<string>(),
    [RegisterNames.OUTPUT_POINTER]: new Register<number>(0),

    [RegisterNames.CURRENT_TOKEN_STREAM]: new Register<string>(""),

    [RegisterNames.PRINTER_STREAM]: new Register<string>(""),
    [RegisterNames.PRINTER_POINTER]: new Register<number>(0),

    [RegisterNames.EXECUTOR_STREAM]: new Register<string>(""),
    [RegisterNames.EXECUTOR_POINTER]: new Register<number>(0),

    [RegisterNames.COMMAND_STACK]: new Register<string[]>([]),
    [RegisterNames.ARGUMENTS_STACK]: new Register<string[]>([]),
    [RegisterNames.ARGUMENTS_STREAM]: new Register<string[]>([]),
    [RegisterNames.EXECUTION_RESULT]: new Register<string>()
}

export default registers;
