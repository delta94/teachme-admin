import React, { useReducer, ReactElement, useEffect } from 'react';

import { ActionType, IAction, IState, IDispatch, IAppProvider } from './app-context.interface';
import { AppStateContext, AppDispatchContext, useAppContext } from './utils';
import { reducer, initialState } from './reducer';

export type { IAction, IState, IDispatch, IAppProvider };

export { useAppContext, reducer, initialState, ActionType };

export default function AppProvider({ children, globals }: IAppProvider): ReactElement {
  const [state, dispatch] = useReducer(reducer, initialState as IState);

  const allPropertiesAreNull = (obj: any) => {
    for (const key in obj) {
      if (obj[key] !== null && obj[key] != '') return false;
    }
    return true;
  };

  useEffect(() => {
    if (globals && !allPropertiesAreNull(globals)) {
      dispatch({ type: ActionType.SetGlobals, globals });
    }
  }, [globals]);
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}
