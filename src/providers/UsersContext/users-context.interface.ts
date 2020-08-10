import { ReactNode } from 'react';

import { UserListUILineItem, UsersOrder } from '../../walkme/models';

import { ActionType } from './actions';

export { ActionType, UsersOrder };

export interface IAction {
  type: ActionType;
  users?: Array<UserListUILineItem>;
  totals_unique_users?: number;
  total_rows?: number;
  usersSearchValue?: string;
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
  usersSearchValue: string;
  isExportingUsers: boolean;
  isExportingUsersError: boolean;
}

export interface IUsersProvider {
  children: ReactNode;
}
