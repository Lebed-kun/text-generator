import State from "./state";
import Transition from "./transition";

interface Automata {
    startState: State;
    transitions: {
        [state: number]: Transition[]
    }
};

export default Automata;
