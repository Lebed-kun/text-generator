import State from "./state";
import Transition from "./transition";

type Automata = {
    [state: number]: Transition[]
};

export default Automata;
