import { createContext, useContext } from 'react';

import * as walkme from '../../walkme';

import { EnvironmentType, ActionType, IState, IDispatch } from './app-context.interface';

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
    const user = await walkme.getUserData();
    const system = await walkme.getSystem();
    const environments = await walkme.getEnvironments();
    const defaultEnv = environments.find((env) => env.id === EnvironmentType.Production);

    dispatch({ type: ActionType.SetUser, user });
    dispatch({ type: ActionType.SetSystem, system });
    dispatch({ type: ActionType.SetEnvironment, environment: defaultEnv });

    dispatch({ type: ActionType.UpdateSuccess });
  } catch (error) {
    console.error(error);
    dispatch({ type: ActionType.UpdateError, errorMessage: error });
  }
};
