import Block from "../utils/Block";
import isEqual from "../utils/isEqual";
import { State, StoreEvents } from "../utils/types";
import { store } from "./store";

export const connect = (mapStateToProps: (state: State) => Record<string, unknown>) => (Component: new(...props: any) => Block) => {
  let state: Record<string, unknown>;

  return class extends Component {
    constructor(props: any) {
      state = mapStateToProps(store.getState() as unknown as State);

      super("div", { ...props, ...state });

      store.on(StoreEvents.UPDATED, () => {
        const newState = mapStateToProps(store.getState() as unknown as State);

        if (!isEqual(state, newState)) {
          this.setProps({ ...newState });
        }
      });
    }
  };
};
