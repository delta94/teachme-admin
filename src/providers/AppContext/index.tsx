import React, { useReducer, ReactElement } from 'react';

import { ActionType, IAction, IState, IDispatch, IAppProvider } from './app-context.interface';
import { AppStateContext, AppDispatchContext, useAppContext } from './utils';
import { reducer, initialState } from './reducer';

export type { IAction, IState, IDispatch, IAppProvider };

export { useAppContext, reducer, initialState, ActionType };

export default function AppProvider({ children }: IAppProvider): ReactElement {
  const [state, dispatch] = useReducer(reducer, initialState as IState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}
