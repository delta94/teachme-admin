import produce from 'immer';

import { defaultDateRange } from '../../utils';

import { ActionType, IState, IAction } from './users-context.interface';

export const initialState = {
  isFetchingUsers: false,
  isFetchingUsersError: false,
  dateRange: defaultDateRange,
  users: [],
  totals_unique_users: 0,
  filteredUsers: [],
  usersSearchValue: '',
  isExportingUsers: false,
  isExportingUsersError: false,
} as IState;

export const reducer = produce(
  (draft: IState, action: IAction): IState => {
    switch (action.type) {
      case ActionType.FetchUsers:
        draft.isFetchingUsers = true;
        draft.isFetchingUsersError = false;
        break;
      case ActionType.FetchUsersSuccess:
        draft.isFetchingUsers = false;
        draft.isFetchingUsersError = false;
        draft.users = action.users ?? initialState.users;
        draft.filteredUsers = action.users ?? initialState.filteredUsers;
        draft.totals_unique_users = action.totals_unique_users ?? initialState.totals_unique_users;
        break;
      case ActionType.FetchUsersError:
        draft.isFetchingUsers = false;
        draft.isFetchingUsersError = true;
        break;
      case ActionType.SetUsersSearchValue:
        draft.usersSearchValue = action.usersSearchValue ?? initialState.usersSearchValue;
        draft.filteredUsers = action.users ?? initialState.filteredUsers;
        break;
      case ActionType.SetDateRange:
        draft.dateRange = action.dateRange ?? initialState.dateRange;
        break;
      case ActionType.ExportUsers:
        draft.isExportingUsers = true;
        draft.isExportingUsersError = false;
        break;
      case ActionType.ExportUsersSuccess:
        draft.isExportingUsers = false;
        draft.isExportingUsersError = false;
        break;
      case ActionType.ExportUsersError:
        draft.isExportingUsers = false;
        draft.isExportingUsersError = true;
        break;
      case ActionType.ResetUsers:
        draft = { ...initialState };
        break;
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }

    return draft;
  },
);
