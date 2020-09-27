type LocalContext = {
    [name: string]: string;
};

type GlobalContext = {
    [name: string]: string | Function
}

const LOCAL_CTX_LITERAL = "@";
const GLOBAL_CTX_LITERAL = "$";

export {
    LocalContext,
    GlobalContext,
    LOCAL_CTX_LITERAL,
    GLOBAL_CTX_LITERAL,
}
