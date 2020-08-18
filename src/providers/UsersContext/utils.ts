import { createContext, useContext } from 'react';

import { getUsersList, getUsersCount, exportUsersData } from '../../walkme';
import { wmMessage, MessageType } from '../../utils';

import {
  ActionType,
  IState,
  IDispatch,
  UsersColumn,
  UsersOrder,
  UserListUILineItem,
  UsersListQueryOptions,
} from './users-context.interface';

export const UsersStateContext = createContext<IState | undefined>(undefined);
export const UsersDispatchContext = createContext<IDispatch | undefined>(undefined);

const useUsersState = () => {
  const context = useContext(UsersStateContext);

  if (context === undefined) {
    throw new Error('useUsersState must be used within a UsersProvider');
  }

  return context;
};

const useUsersDispatch = () => {
  const context = useContext(UsersDispatchContext);

  if (context === undefined) {
    throw new Error('useUsersDispatch must be used within a UsersProvider');
  }

  return context;
};

export const useUsersContext = (): [IState, IDispatch] => [useUsersState(), useUsersDispatch()];

export const defaultQueryOptions = {
  first_item_index: 0,
  num_of_records: 50,
  sort_by: UsersColumn.ID,
  sort_by_order: UsersOrder.ASC,
};

export const fetchUsers = async (
  dispatch: IDispatch,
  envId: number,
  from: string,
  to: string,
  options: UsersListQueryOptions,
  prevUsers?: Array<UserListUILineItem>,
): Promise<void> => {
  dispatch({ type: ActionType.FetchUsers });

  try {
    const [usersList, usersCount] = await Promise.all([
      getUsersList(envId, from, to, options),
      getUsersCount(envId, from, to, options),
    ]);

    const { data } = usersList;
    const { totals_unique_users, total_rows } = usersCount;

    let users = [];

    if (prevUsers) {
      users = [...prevUsers, ...data];
    } else {
      users = [...data];
    }

    dispatch({ type: ActionType.FetchUsersSuccess, users, totals_unique_users, total_rows });
  } catch (error) {
    console.error(error);
    dispatch({ type: ActionType.FetchUsersError });
  }
};

export const exportUsers = async (
  dispatch: IDispatch,
  envId: number,
  from: string,
  to: string,
  queryOptions: UsersListQueryOptions,
): Promise<void> => {
  dispatch({ type: ActionType.ExportUsers });

  try {
    await exportUsersData(envId, from, to, queryOptions);

    dispatch({ type: ActionType.ExportUsersSuccess });
    wmMessage('Export completed');
  } catch (error) {
    console.error(error);
    dispatch({ type: ActionType.ExportUsersError });
    wmMessage('Export failed', MessageType.Error);
  }
};
