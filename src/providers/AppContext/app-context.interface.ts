import { ReactNode } from 'react';

import { ActionType } from './actions';

export { ActionType };

export interface IAction {
  type: ActionType;
  currentScreen?: any;
}

export interface IDispatch {
  (action: IAction): void;
}

export interface IState {
  screenProvider: any;
  isUpdating: boolean;
  hasUpdateError: boolean;
  errorMessage: string;
}

export interface IAppProvider {
  children: ReactNode;
}
