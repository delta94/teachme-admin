import { ReactNode } from 'react';
import { UserData } from '@walkme/editor-sdk/dist/user';
import { WalkMeEnvironment } from '@walkme/editor-sdk/dist/environment';
import { SystemData } from '@walkme/editor-sdk/dist/system';

import { ActionType } from './actions';

export { ActionType };

export interface IGlobalItemData<T extends WalkMeEnvironment | SystemData> {
  active: T;
  options: Array<T>;
}

export interface IGlobals {
  user: UserData | null;
  environment: IGlobalItemData<WalkMeEnvironment>;
  system: IGlobalItemData<SystemData>;
}
export interface IAction {
  type: ActionType;
  currentScreen?: any;
  globals?: IGlobals;
  errorMsg?: string;
}

export interface IDispatch {
  (action: IAction): void;
}

export interface IState {
  screenProvider: any;
  isUpdating: boolean;
  hasUpdateError: boolean;
  errorMessage?: string;
  globals?: IGlobals;
}

export interface IAppProvider {
  children: ReactNode;
}
