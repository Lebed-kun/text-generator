import State from "./state";
import Transition from "./transition";

interface TransitionNetwork {
    startState: State;
    transitions: {
        [state: number]: Transition[]
    }
};

export default TransitionNetwork;
