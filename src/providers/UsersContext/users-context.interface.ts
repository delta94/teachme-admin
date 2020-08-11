import { ReactNode } from 'react';

import {
  UsersListQueryOptions,
  UsersColumn,
  UsersOrder,
  UserListUILineItem,
} from '../../walkme/models';

import { ActionType } from './actions';

export { ActionType, UsersOrder, UsersColumn };

export type { UserListUILineItem, UsersListQueryOptions };

export interface IAction {
  type: ActionType;
  users?: Array<UserListUILineItem>;
  totals_unique_users?: number;
  total_rows?: number;
}

export interface IDispatch {
  (action: IAction): void;
}

export interface IState {
  isFetchingUsers: boolean;
  isFetchingUsersError: boolean;
  users: Array<UserListUILineItem>;
  totals_unique_users: number;
  total_rows: number;
  isExportingUsers: boolean;
  isExportingUsersError: boolean;
}

export interface IUsersProvider {
  children: ReactNode;
}
