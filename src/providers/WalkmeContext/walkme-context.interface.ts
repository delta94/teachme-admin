import { ReactNode } from 'react';

import { ActionType } from './actions';

export { ActionType };

export interface IAction {
  type: ActionType;
  walkme?: any;
}

export interface IDispatch {
  (action: IAction): void;
}

export interface IState {
  walkmeSDK: any;
}

export interface IWalkmeProvider {
  children: ReactNode;
}
