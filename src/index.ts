export interface IAction {
  type: string;
  payload?: any;
}

type Reducer<State> = (state: State | undefined, action: IAction) => State;

interface IConfigureStoreOptions<State> {
  reducer: Reducer<State>;
  initialState?: State;
}

type Subscriber = () => void;

export const configureStore = <State>({
  reducer,
  initialState
}: IConfigureStoreOptions<State>) => {
  let state: State = initialState || reducer(undefined, { type: "" });
  const subscribers: Subscriber[] = [];
  const dispatch = (action: IAction) => {
    state = reducer(state, action);
    subscribers.forEach(subscriber => subscriber());
  };
  const subscribe = (subscriber: Subscriber) => {
    subscribers.push(subscriber);
    return () => {
      subscribers.splice(subscribers.indexOf(subscriber), 1);
    };
  };
  return {
    dispatch,
    get state() {
      return state;
    },
    subscribe
  };
};

export const combineReducers = <State extends { [key: string]: any }>(
  reducers: { [K in keyof State]: Reducer<State[K]> }
): Reducer<State> => (state, action) => {
  const newState = {} as State;
  Object.keys(reducers).forEach(key => {
    newState[key] = reducers[key](state[key], action);
  });

  return newState;
};
