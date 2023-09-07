interface StoreObservers {
  [key: string]: SubscribeCallBack[];
}
interface SubscribeCallBack {
  (arg: unknown): void;
}
export class Store<S> {
  state: S;
  observers: StoreObservers;
  constructor(state: S) {
    this.state = {} as S;
    //s가 number일 수도 있기에 단언을 안하면 오류가 남
    this.observers = {};
    for (const key in state) {
      Object.defineProperty(this.state, key, {
        get: () => state[key],
        set: (val) => {
          state[key] = val;
          if (Array.isArray(this.observers[key])) {
            this.observers[key].forEach((observer) => observer(val));
          }
        },
      });
    }
  }
  subscribe(key: string, cb: SubscribeCallBack) {
    Array.isArray(this.observers[key])
      ? this.observers[key].push(cb)
      : (this.observers[key] = [cb]);
  }
}
