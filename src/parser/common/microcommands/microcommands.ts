import { 
    Store, 
    LocalContext, 
    GlobalContext, 
    Register,
    LOCAL_CTX_LITERAL,
    GLOBAL_CTX_LITERAL, 
    Microcommand,
} from "../../basic";

import { RegisterNames } from "../registers/types";
import { Command } from "../types";

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
    globalContext: GlobalContext
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
    _2: GlobalContext
) => {
    const register: Register<any> = registerStore[registerNames[0]];
    register.reset();
}

export const pushUsingLocalCtx = (
    registerNames: number[],
    registerStore: Store,
    localContext: LocalContext,
    _: GlobalContext
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
    _: LocalContext,
    globalContext: GlobalContext
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
    _2: GlobalContext
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
    globalContext: GlobalContext
) => {
    const commandRegister: Register<string> = registerStore[registerNames[2]];
    const command = commandRegister.get()!;

    const args: string[] = [];


}
