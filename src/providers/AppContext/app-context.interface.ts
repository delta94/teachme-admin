import { ReactNode } from 'react';
import { UserData } from '@walkme/editor-sdk/dist/user';
import { WalkMeEnvironment } from '@walkme/editor-sdk/dist/environment';
import { SystemData } from '@walkme/editor-sdk/dist/system';

import { ActionType } from './actions';

export { ActionType };

export interface IAction {
  type: ActionType;
  currentScreen?: any;
  user: UserData;
  environment: WalkMeEnvironment;
  system: SystemData;
}

export interface IDispatch {
  (action: IAction): void;
}

export interface IState {
  screenProvider: any;
  isUpdating: boolean;
  hasUpdateError: boolean;
  errorMessage: string;
  user: UserData | null;
  environment: WalkMeEnvironment | null;
  system: SystemData | null;
}

export interface IAppProvider {
  children: ReactNode;
}
