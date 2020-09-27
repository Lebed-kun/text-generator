import Command from "./command";

type LocalContext = {
    [name: string]: string;
};

type GlobalContext = {
    [name: string]: string | Function | Command;
}

type StaticContext = {
    [name: string]: string | Function | Command;
};

const LOCAL_CTX_LITERAL = "@";
const GLOBAL_CTX_LITERAL = "$";

export {
    LocalContext,
    GlobalContext,
    StaticContext,
    LOCAL_CTX_LITERAL,
    GLOBAL_CTX_LITERAL,
}
