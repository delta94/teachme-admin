import { createContext, useContext } from 'react';

import { getUsersList, getUsersCount, exportUsersData } from '../../walkme';
import { UsersListQueryOptions } from '../../walkme/models';
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
  envId = 0,
  from: string,
  to: string,
  options: UsersListQueryOptions,
): Promise<void> => {
  dispatch({ type: ActionType.FetchUsers });

  try {
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
  envId = 0,
  from: string,
  to: string,
  options: UsersListQueryOptions,
): Promise<void> => {
  dispatch({ type: ActionType.ExportUsers });

  try {
    await exportUsersData(envId, from, to, options);

    dispatch({ type: ActionType.ExportUsersSuccess });
    wmMessage('Export completed');
  } catch (error) {
    console.error(error);
    dispatch({ type: ActionType.ExportUsersError });
    wmMessage('Export failed', MessageType.Error);
  }
};
