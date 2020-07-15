import { createContext, useContext } from 'react';

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
