import React, { useReducer, ReactElement, useEffect } from 'react';

import { ActionType, IAction, IState, IDispatch, IAppProvider } from './app-context.interface';
import { AppStateContext, AppDispatchContext, useAppContext, setInitialGlobals } from './utils';
import { reducer, initialState } from './reducer';

export type { IAction, IState, IDispatch, IAppProvider };

export { useAppContext, reducer, initialState, ActionType };

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
