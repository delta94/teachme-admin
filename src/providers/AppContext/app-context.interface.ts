import { ReactNode } from 'react';

import { WalkMeEnvironment } from '@walkme/editor-sdk/dist/environment';
import { SystemData } from '@walkme/editor-sdk/dist/system';

import { IAppGlobals } from '../../utils/app-utils';
import { ActionType } from './actions';

export { ActionType };

export interface IAction {
  type: ActionType;
  currentScreen?: any;
  errorMsg?: string;
  globals?: IAppGlobals;
}

export interface IDispatch {
  (action: IAction): void;
}

export interface IState {
  screenProvider: any;
  isUpdating: boolean;
  hasUpdateError: boolean;
  errorMessage?: string;
  globals?: IAppGlobals;
}

export interface IAppProvider {
  children: ReactNode;
  globals?: IAppGlobals;
}
