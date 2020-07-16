import { createContext, useContext } from 'react';

import { IAppGlobals } from '../../utils/app-utils';

import { ActionType, IState, IDispatch } from './app-context.interface';
import { allPropertiesAreNull } from '../../utils';

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

export const setAppGlobals = (dispatch: IDispatch, globals: IAppGlobals): void => {
  if (!globals) return;
  const { errorMsg, hasError, ...dataOnly } = globals;
  const isDataEmpty = allPropertiesAreNull(dataOnly);

  if (globals && globals.hasError) {
    dispatch({ type: ActionType.UpdateError, globals: globals, errorMsg: globals.errorMsg });
  } else if (!isDataEmpty) {
    dispatch({ type: ActionType.UpdateGlobalsSuccess, globals });
  }
};
