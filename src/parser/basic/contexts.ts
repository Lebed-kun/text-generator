type LocalContext = {
    [name: string]: string;
};

type GlobalContext = {
    [name: string]: string | Function
}

export {
    LocalContext,
    GlobalContext
}
