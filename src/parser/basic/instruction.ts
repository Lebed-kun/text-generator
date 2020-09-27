interface ExecutionStep {
    opCode: number;
    registers: number[];
}

type Instruction = ExecutionStep[];

export default Instruction;
