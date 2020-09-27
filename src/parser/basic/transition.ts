import Predicate from "./predicate";
import State from "./state";
import Instruction from "./instruction";

interface Transition {
    condition: Predicate;
    newState: State;
    callback?: Instruction;
}

export default Transition;