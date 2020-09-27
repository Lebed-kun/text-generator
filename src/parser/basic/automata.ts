import TransitionNetwork from "./transition-network";
import Processor from "./processor";
import Store from "./store";
import { LocalContext, GlobalContext } from "./contexts";
import State from "./state";
import Transition from "./transition";
import Instruction from "./instruction";

class Automata {
    private transitionNetwork: TransitionNetwork;
    private processor: Processor;
    private registers: Store;
    private machineRAM: LocalContext;
    private sharedRAM: GlobalContext;

    private currentState: State = -1;

    constructor(
        transitionNetwork: TransitionNetwork,
        processor: Processor,
        registers: Store,
        machineRAM: LocalContext,
        sharedRAM: GlobalContext
    ) {
        this.transitionNetwork = transitionNetwork;
        this.processor = processor;
        this.registers = registers;
        this.machineRAM = machineRAM;
        this.sharedRAM = sharedRAM;
    }

    public useProcessor(processor: Processor): void {
        this.processor = processor;
    }

    public useRegisters(registers: Store): void {
        this.registers = registers;
    }

    public useMachineRAM(machineRAM: LocalContext): void {
        this.machineRAM = machineRAM;
    }

    public useSharedRAM(sharedRAM: GlobalContext): void {
        this.sharedRAM = sharedRAM;
    }

    public run(): void {
        this.currentState = this.transitionNetwork.startState;
        
        let running = true;
        while (running) {
            const transitions = this.transitionNetwork.transitions[
                this.currentState
            ];

            running = this.processTransitions(transitions);
        }
    }

    // Returns false if no condition is met to transit from state
    private processTransitions(transitions: Transition[]): boolean {
        for (let i = 0; i < transitions.length; i++) {
            const condition = transitions[i].condition(
                this.registers,
                this.machineRAM,
                this.sharedRAM
            );

            if (condition) {
                this.currentState = transitions[i].newState;
                
                if (typeof transitions[i].callback !== "undefined") {
                    this.executeInstruction(transitions[i].callback!);
                }

                return true;
            }
        }

        return false;
    }

    private executeInstruction(instruction: Instruction): void {
        for (let i = 0; i < instruction.length; i++) {
            this.processor[instruction[i].opCode](
                instruction[i].registers,
                this.registers,
                this.machineRAM,
                this.sharedRAM
            );
        }
    }
}

export default Automata;
