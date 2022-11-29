import EventBus from "../utils/EventBus";
import set from "../utils/set";
import { Indexed, StoreEvents } from "../utils/types";

class Store extends EventBus {
  private state: Indexed = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.UPDATED);
  }
}

export const store = new Store();
