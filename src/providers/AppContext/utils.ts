import { createContext, useContext } from 'react';
import { SystemData } from '@walkme/editor-sdk/dist/system';
import { WalkMeEnvironment } from '@walkme/editor-sdk/dist/environment';

import * as walkme from '../../walkme';
import { defaultDateRange, dateRangeLocalStorageKey } from '../../utils';

import { EnvironmentType, ActionType, IState, IDispatch } from './app-context.interface';
import { getSystems as fetchSystems } from '../../walkme';
import { parseSystems } from '../../components/Layout/HeaderToolbar/utils';

export const AppStateContext = createContext<IState | undefined>(undefined);
export const AppDispatchContext = createContext<IDispatch | undefined>(undefined);

const useAppState = () => {
  const context = useContext(AppStateContext);

  if (context === undefined) {
    throw new Error('useAppState must be used within a AppProvider');
  }

  return context;
};

const useAppDispatch = () => {
  const context = useContext(AppDispatchContext);

  if (context === undefined) {
    throw new Error('useAppDispatch must be used within a AppProvider');
  }

  return context;
};

export const useAppContext = (): [IState, IDispatch] => [useAppState(), useAppDispatch()];

export const setInitialGlobals = async (dispatch: IDispatch): Promise<void> => {
  dispatch({ type: ActionType.Updating });

  try {
    const [user, originalUser, system, environments, systems] = await Promise.all([
      walkme.getUserData(),
      walkme.getOriginalUserData(),
      walkme.getSystemData(),
      walkme.getEnvironments(),
      getSystems(),
    ]);

    const defaultEnv = environments.find(
      (env: WalkMeEnvironment) => env.id === EnvironmentType.Production,
    );

    dispatch({ type: ActionType.SetUser, user });
    dispatch({ type: ActionType.SetOriginalUser, originalUser });
    dispatch({ type: ActionType.SetSystem, system });
    dispatch({ type: ActionType.SetSystems, systems });
    dispatch({ type: ActionType.SetEnvironments, environments });
    dispatch({ type: ActionType.SetEnvironment, environment: defaultEnv });

    // Get `dateRange` from `localStorage` when available
    const storedDateRange = localStorage.getItem(dateRangeLocalStorageKey);

    dispatch({
      type: ActionType.SetDateRange,
      dateRange: storedDateRange ? JSON.parse(storedDateRange) : defaultDateRange,
    });

    dispatch({ type: ActionType.UpdateSuccess });
  } catch (error) {
    console.error(error);
    dispatch({ type: ActionType.UpdateError, errorMessage: error });
  }
};

async function getSystems(): Promise<SystemData[]> {
  try {
    return await fetchSystems();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const setAppSystem = async ({
  dispatch,
  systems,
  systemId,
}: {
  dispatch: IDispatch;
  systems: SystemData[];
  systemId: number;
}): Promise<void> => {
  dispatch({ type: ActionType.Updating });
  const system = systems.find(({ userId }: { userId: number }) => systemId === userId);

  try {
    await walkme.switchSystem(systemId);
    dispatch({ type: ActionType.SetSystem, system });
    dispatch({ type: ActionType.UpdateSuccess });
  } catch (error) {
    console.error(error);
    dispatch({ type: ActionType.UpdateError, errorMessage: error });
  }
};

export const setAppEnvironment = async ({
  dispatch,
  environments,
  envId,
}: {
  dispatch: IDispatch;
  environments: WalkMeEnvironment[];
  envId: number;
}): Promise<void> => {
  dispatch({ type: ActionType.Updating });
  const environment = environments.find(({ id }: { id: number }) => envId === id);

  try {
    dispatch({ type: ActionType.SetEnvironment, environment });

    // TODO: here we need to add the call to get data

    dispatch({ type: ActionType.UpdateSuccess });
  } catch (error) {
    console.error(error);
    dispatch({ type: ActionType.UpdateError, errorMessage: error });
  }
};
