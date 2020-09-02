import { ReactNode } from 'react';
import { UserData } from '@walkme/editor-sdk/dist/user';
import { SystemData } from '@walkme/editor-sdk/dist/system';
import { WalkMeEnvironment } from '@walkme/editor-sdk/dist/environment';

import { EnvironmentType } from '../../interfaces/app.interfaces';
import { IDateRange } from '../../utils';
import { IWMDropdownOption } from '../../components/common/WMDropdown';

import { ActionType } from './actions';

export { EnvironmentType, ActionType };

export interface IAction {
  type: ActionType;
  currentScreen?: any;
  errorMessage?: string;
  user?: UserData;
  originalUser?: UserData;
  system?: SystemData | string; // string type for non-system-users - temporary solution
  environments?: WalkMeEnvironment[];
  environment?: WalkMeEnvironment;
  dateRange?: IDateRange;
  systems?: SystemData[];
  lastUpdateTime?: Date;
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
  originalUser: UserData;
  system: SystemData | string; // string type for non-system-users - temporary solution
  environment: WalkMeEnvironment;
  environments: WalkMeEnvironment[];
  parsedEnvironments: IWMDropdownOption[];
  dateRange: IDateRange;
  systems: SystemData[];
  parsedSystems: IWMDropdownOption | IWMDropdownOption[];
  lastUpdateTime?: Date | null;
}

export interface IAppProvider {
  children: ReactNode;
}
