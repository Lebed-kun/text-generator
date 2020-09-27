import { 
    Store, 
    LocalContext, 
    GlobalContext,
    StaticContext, 
    Register,
    LOCAL_CTX_LITERAL,
    GLOBAL_CTX_LITERAL, 
    Microcommand,
    Command,
} from "../../basic";

import { RegisterNames } from "../registers/types";

const _push = (sequence: string | string[], argument: string): string | string[] => {
    if (typeof sequence === "string") {
        return sequence + argument;
    } else {
        sequence.push(argument);
        return sequence;
    }
};

export const push: Microcommand = (
    registerNames: number[],
    registerStore: Store,
    localContext: LocalContext,
    globalContext: GlobalContext,
    _: StaticContext,
) => {
    const sequenceRegister: Register<string | string[]> = registerStore[registerNames[0]];
    const sequence = sequenceRegister.get()!;
    
    const argumentRegister: Register<string> = registerStore[registerNames[1]];
    const argument = argumentRegister.get()!;

    if (argument.startsWith(LOCAL_CTX_LITERAL)) {
        sequenceRegister.set(
            _push(sequence, localContext[argument.slice(1)])
        );
    } else if (argument.startsWith(GLOBAL_CTX_LITERAL)) {
        const argumentName = argument.slice(1);
        const contextVariable = globalContext[argumentName];

        if (typeof contextVariable !== "string") {
            throw new Error(
                "Using functions as sequence items isn't supported now"
            );
        } else {
            sequenceRegister.set(
                _push(sequence, contextVariable)
            )
        }
    } else {
        sequenceRegister.set(
            _push(sequence, argument)
        );
    }
}

export const clear: Microcommand = (
    registerNames: number[],
    registerStore: Store,
    _1: LocalContext,
    _2: GlobalContext,
    _3: StaticContext,
) => {
    const register: Register<any> = registerStore[registerNames[0]];
    register.reset();
}

export const pushUsingLocalCtx = (
    registerNames: number[],
    registerStore: Store,
    localContext: LocalContext,
    _1: GlobalContext,
    _2: StaticContext,
) => {
    const sequenceRegister: Register<string | string[]> = registerStore[registerNames[0]];
    const sequence = sequenceRegister.get()!;

    const argumentRegister: Register<string> = registerStore[registerNames[1]];
    const argument = argumentRegister.get()!;

    sequenceRegister.set(
        _push(sequence, localContext[argument])
    );
}

export const pushUsingGlobalCtx: Microcommand = (
    registerNames: number[],
    registerStore: Store,
    _1: LocalContext,
    globalContext: GlobalContext,
    _2: StaticContext,
) => {
    const sequenceRegister: Register<string | string[]> = registerStore[registerNames[0]];
    const sequence = sequenceRegister.get()!;

    const argumentRegister: Register<string> = registerStore[registerNames[1]];
    const argument = argumentRegister.get()!;

    const contextVariable = globalContext[argument];

    if (typeof contextVariable !== "string") {
        throw new Error(
            "Using functions as sequence items isn't supported now"
        );
    } else {
        sequenceRegister.set(
            _push(sequence, contextVariable)
        )
    }
}

export const pop: Microcommand = (
    registerNames: number[],
    registerStore: Store,
    _1: LocalContext,
    _2: GlobalContext,
    _3: StaticContext,
) => {
    const storeRegister: Register<string> = registerStore[registerNames[0]];
    
    const sequenceRegister: Register<string[]> = registerStore[registerNames[1]];
    const sequence = sequenceRegister.get()!;

    storeRegister.set(
        sequence.pop()!
    );
}

export const popArguments: Microcommand = (
    registerNames: number[],
    registerStore: Store,
    localContext: LocalContext,
    globalContext: GlobalContext,
    staticContext: StaticContext,
) => {
    const commandRegister: Register<string> = registerStore[registerNames[2]];
    const rawCommandName = commandRegister.get()!;

    if (rawCommandName.startsWith(LOCAL_CTX_LITERAL)) {
        throw new Error("Runtime defined routines aren't supported now");
    }

    const rom = rawCommandName.startsWith(GLOBAL_CTX_LITERAL) ? globalContext : staticContext;
    const commandName = rawCommandName.startsWith(GLOBAL_CTX_LITERAL) ? rawCommandName.slice(1) : rawCommandName;
    const command = rom[commandName];

    const argsStackRegister: Register<string[]> = registerStore[registerNames[1]];
    const argsStack = argsStackRegister.get()!;
    
    const argsRegister: Register<string[]> = registerStore[registerNames[0]];
    const args = argsRegister.get()!;

    if (typeof command === "string" || typeof command === "function") {
        throw new Error("Invalid command type");
    } else {
        for (let i = 0; i < command.argsCount; i++) {
            args.push(argsStack.pop()!);
        }

        argsRegister.set(args);
    }
}
