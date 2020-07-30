import { ReactNode } from 'react';

import { UserListUILineItem } from '../../walkme/models';
import { IDateRange } from '../../utils';

import { ActionType } from './actions';

export { ActionType };

export interface IAction {
  type: ActionType;
  users?: Array<UserListUILineItem>;
  totals_unique_users?: number;
  total_rows?: number;
  dateRange?: IDateRange;
  usersSearchValue?: string;
}

export interface IDispatch {
  (action: IAction): void;
}

export interface IState {
  isFetchingUsers: boolean;
  isFetchingUsersError: boolean;
  dateRange: IDateRange;
  users: Array<UserListUILineItem>;
  totals_unique_users: number;
  total_rows: number;
  filteredUsers: Array<UserListUILineItem>;
  usersSearchValue: string;
  isExportingUsers: boolean;
  isExportingUsersError: boolean;
}

export interface IUsersProvider {
  children: ReactNode;
}
