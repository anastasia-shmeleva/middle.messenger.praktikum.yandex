export type Listener<T extends unknown[] = any[]> = (...args: T) => void;

export default class EventBus<
  M extends { [K in string]: unknown[] } = Record<string, any[]>,
> {
  private listeners: { [key in string]?: Listener<M[string]>[] } = {};


  on(event: string, callback: Listener<M[string]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]!.push(callback);
  }

  off(event: string, callback: Listener<M[string]>) {
		if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event]!.filter(
      listener => listener !== callback
    );
  }

	emit(event: string, ...args: M[string]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    
    this.listeners[event]!.forEach(function(listener) {
      listener(...args);
    });
  }
}
