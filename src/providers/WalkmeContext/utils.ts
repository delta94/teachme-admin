import { createContext, useContext } from 'react';

import { ActionType, IState, IDispatch } from './walkme-context.interface';

export const WalkmeStateContext = createContext<IState | undefined>(undefined);
export const WalkmeDispatchContext = createContext<IDispatch | undefined>(undefined);

const useWalkmeState = () => {
  const context = useContext(WalkmeStateContext);

  if (context === undefined) {
    throw new Error('useWalkmeState must be used within a WalkmeProvider');
  }

  return context;
};

const useWalkmeDispatch = () => {
  const context = useContext(WalkmeDispatchContext);

  if (context === undefined) {
    throw new Error('useWalkmeDispatch must be used within a WalkmeProvider');
  }

  return context;
};

export const useWalkmeContext = (): [IState, IDispatch] => [useWalkmeState(), useWalkmeDispatch()];
