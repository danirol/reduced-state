type Reducer<State> = <Action>(
  state: State | undefined,
  action: Action
) => State;

interface IConfigureStoreOptions<State> {
  reducer: Reducer<State>;
  initialState?: State;
}

type Subscriber = () => void;

export const configureStore = <State, Action>({
  reducer,
  initialState
}: IConfigureStoreOptions<State>) => {
  let state: State = initialState || reducer(undefined, { type: "" });
  const subscribers: Subscriber[] = [];
  const dispatch = (action: Action) => {
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

export const combineReducers = <State extends {}>(
  reducers: { [K in keyof State]: Reducer<State[K]> }
): Reducer<State> => (state = {} as State, action) => {
  const newState = {} as State;
  Object.keys(reducers).forEach(key => {
    newState[key] = reducers[key](state[key], action);
  });

  return newState;
};
