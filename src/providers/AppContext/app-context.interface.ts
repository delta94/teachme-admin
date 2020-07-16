import { ReactNode } from 'react';
import { UserData } from '@walkme/editor-sdk/dist/user';
import { SystemData } from '@walkme/editor-sdk/dist/system';
import { WalkMeEnvironment } from '@walkme/editor-sdk/dist/environment';

import { ActionType } from './actions';

export { ActionType };

export interface IAction {
  type: ActionType;
  currentScreen?: any;
  errorMsg?: string;
  user?: UserData;
  system?: SystemData;
  environment?: WalkMeEnvironment;
}

export interface IDispatch {
  (action: IAction): void;
}

export interface IState {
  screenProvider: any;
  isUpdating: boolean;
  hasUpdateError: boolean;
  errorMessage?: string;
  user: UserData;
  system: SystemData;
  environment: WalkMeEnvironment;
}

export interface IAppProvider {
  children: ReactNode;
}
