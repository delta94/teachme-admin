import produce from 'immer';
import { UserData } from '@walkme/editor-sdk/dist/user';
import { WalkMeEnvironment } from '@walkme/editor-sdk/dist/environment';
import { SystemData } from '@walkme/editor-sdk/dist/system';

import { parseEnvironments } from '../../components/Layout/HeaderToolbar/utils';
import { IWMDropdownOption } from '../../components/common/WMDropdown';
import { defaultDateRange, dateRangeLocalStorageKey } from '../../utils';

import { ActionType, IState, IAction } from './app-context.interface';

export const initialState = {
  screenProvider: null,
  isUpdating: true,
  hasUpdateError: false,
  errorMessage: '',
  user: {} as UserData,
  system: {} as SystemData,
  environment: {} as WalkMeEnvironment,
  environments: {} as WalkMeEnvironment[],
  parsedEnvironments: [] as IWMDropdownOption[],
  originalUser: {} as UserData,
  dateRange: defaultDateRange,
};

export const reducer = produce(
  (draft: IState, action: IAction): IState => {
    switch (action.type) {
      case ActionType.Updating:
        draft.isUpdating = true;
        draft.hasUpdateError = false;
        draft.errorMessage = '';
        break;
      case ActionType.UpdateSuccess:
        draft.isUpdating = false;
        draft.hasUpdateError = false;
        draft.errorMessage = '';
        break;
      case ActionType.UpdateError:
        draft.isUpdating = false;
        draft.hasUpdateError = true;
        draft.errorMessage = action.errorMessage ?? initialState.errorMessage;
        break;
      case ActionType.SetUser:
        draft.user = action.user ?? initialState.user;
        break;
      case ActionType.SetOriginalUser:
        draft.originalUser = action.originalUser ?? initialState.originalUser;
        break;
      case ActionType.SetSystem:
        draft.system = action.system ?? initialState.system;
        break;
      case ActionType.SetEnvironments:
        draft.environments = action.environments ?? [];
        draft.parsedEnvironments = parseEnvironments(action.environments ?? []);
        break;
      case ActionType.SetEnvironment:
        draft.environment = action.environment ?? initialState.environment;
        break;
      case ActionType.SetDateRange:
        draft.dateRange = action.dateRange ?? initialState.dateRange;
        // Persist `dateRange` to `localStorage` on change
        if (action.dateRange)
          localStorage.setItem(dateRangeLocalStorageKey, JSON.stringify(action.dateRange));
        break;
      case ActionType.CurrentScreenProvider:
        draft.screenProvider = action.currentScreen;
        break;
      case ActionType.ResetAppState:
        draft = { ...initialState };
        break;
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }

    return draft;
  },
);
