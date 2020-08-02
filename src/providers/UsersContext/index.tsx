import React, { useReducer, ReactElement } from 'react';

import { ActionType, IAction, IState, IDispatch, IUsersProvider } from './users-context.interface';
import {
  UsersStateContext,
  UsersDispatchContext,
  useUsersContext,
  defaultQueryOptions,
  fetchUsers,
  exportUsers,
} from './utils';
import { reducer, initialState } from './reducer';

export type { IAction, IState, IDispatch, IUsersProvider };

export {
  useUsersContext,
  defaultQueryOptions,
  fetchUsers,
  exportUsers,
  reducer,
  initialState,
  ActionType,
};

export default function UsersProvider({ children }: IUsersProvider): ReactElement {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UsersStateContext.Provider value={state}>
      <UsersDispatchContext.Provider value={dispatch}>{children}</UsersDispatchContext.Provider>
    </UsersStateContext.Provider>
  );
}
