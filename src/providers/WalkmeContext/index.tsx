import React, { useReducer, ReactElement } from 'react';

import {
  ActionType,
  IAction,
  IState,
  IDispatch,
  IWalkmeProvider,
} from './walkme-context.interface';
import { WalkmeStateContext, WalkmeDispatchContext, useWalkmeContext } from './utils';
import { reducer, initialState } from './reducer';

export type { IAction, IState, IDispatch, IWalkmeProvider };

export { useWalkmeContext, reducer, initialState, ActionType };

export default function WalkmeProvider({ children }: IWalkmeProvider): ReactElement {
  const [state, dispatch] = useReducer(reducer, initialState as IState);

  return (
    <WalkmeStateContext.Provider value={state}>
      <WalkmeDispatchContext.Provider value={dispatch}>{children}</WalkmeDispatchContext.Provider>
    </WalkmeStateContext.Provider>
  );
}
