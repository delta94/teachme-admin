import { createContext, useContext } from 'react';

import { getUsersList, getUsersCount, exportUsersData } from '../../walkme';
import { UsersListQueryOptions, UsersColumn, UsersOrder } from '../../walkme/models';
import { wmMessage, MessageType } from '../../utils';

import { ActionType, IState, IDispatch } from './users-context.interface';

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

export const fetchUsers = async (
  dispatch: IDispatch,
  envId: number,
  from: string,
  to: string,
  options?: UsersListQueryOptions,
): Promise<void> => {
  dispatch({ type: ActionType.FetchUsers });

  try {
    // TODO: utilize 'load more' button using 'first_item_index'
    const { data: users } = await getUsersList(envId, from, to, options);
    const { totals_unique_users } = await getUsersCount(envId, from, to, options);

    dispatch({ type: ActionType.FetchUsersSuccess, users, totals_unique_users });
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
): Promise<void> => {
  dispatch({ type: ActionType.ExportUsers });

  try {
    const options = {
      first_item_index: 0,
      num_of_records: 100,
      sort_by: UsersColumn.ID,
      sort_by_order: UsersOrder.ASC,
    };
    await exportUsersData(envId, from, to, options);

    dispatch({ type: ActionType.ExportUsersSuccess });
    wmMessage('Export completed');
  } catch (error) {
    console.error(error);
    dispatch({ type: ActionType.ExportUsersError });
    wmMessage('Export failed', MessageType.Error);
  }
};