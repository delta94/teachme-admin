import { createContext, useContext } from 'react';

import { getUserData, getSystem, getEnvironments, getSystems } from '../../walkme';

import { ActionType, IState, IDispatch } from './app-context.interface';

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

export const setGlobals = async (dispatch: IDispatch): Promise<void> => {
  dispatch({ type: ActionType.Updating });

  try {
    const user = await getUserData();
    const environments = await getEnvironments();
    const activeSystem = await getSystem();
    const systems = await getSystems();

    const globals = {
      user,
      environment: {
        active: environments[0],
        options: environments,
      },
      system: {
        active: activeSystem,
        options: systems,
      },
    };

    console.log('globals ', globals);

    dispatch({ type: ActionType.SetGlobals, globals });
    dispatch({ type: ActionType.UpdateSuccess });
  } catch (error) {
    console.error(error);
    dispatch({ type: ActionType.UpdateError, errorMsg: error });
  }
};
