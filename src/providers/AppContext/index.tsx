import React, { useReducer, ReactElement, useEffect } from 'react';

import { ActionType, IAction, IState, IDispatch, IAppProvider } from './app-context.interface';
import {
  AppStateContext,
  AppDispatchContext,
  useAppContext,
  setInitialGlobals,
  setAppEnvironment,
  setAppSystem,
} from './utils';
import { reducer, initialState } from './reducer';

export type { IAction, IState, IDispatch, IAppProvider };

export {
  useAppContext,
  reducer,
  initialState,
  ActionType,
  setInitialGlobals,
  setAppEnvironment,
  setAppSystem,
};

export default function AppProvider({ children }: IAppProvider): ReactElement {
  const [state, dispatch] = useReducer(reducer, initialState as IState);

  useEffect(() => {
    setInitialGlobals(dispatch);
  }, []);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}
