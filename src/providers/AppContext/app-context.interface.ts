import { ReactNode } from 'react';
import { UserData, ImpersonateData } from '@walkme/editor-sdk/dist/user';
import { SystemData } from '@walkme/editor-sdk/dist/system';
import { WalkMeEnvironment } from '@walkme/editor-sdk/dist/environment';

import { EnvironmentType } from '../../interfaces/app.interfaces';

import { ActionType } from './actions';

export { EnvironmentType, ActionType };

export interface IAction {
  type: ActionType;
  currentScreen?: any;
  errorMessage?: string;
  user?: UserData;
  system?: SystemData;
  environment?: WalkMeEnvironment;
  impersonate?: ImpersonateData;
}

export interface IDispatch {
  (action: IAction): void;
}

export interface IState {
  screenProvider: any;
  isUpdating: boolean;
  hasUpdateError: boolean;
  errorMessage: string;
  user: UserData;
  system: SystemData;
  environment: WalkMeEnvironment;
  impersonate: ImpersonateData;
}

export interface IAppProvider {
  children: ReactNode;
}
