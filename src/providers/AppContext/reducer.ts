import { UserData } from '@walkme/editor-sdk/dist/user';
import { WalkMeEnvironment } from '@walkme/editor-sdk/dist/environment';
import { SystemData } from '@walkme/editor-sdk/dist/system';

import { defaultDateRange } from '../../utils';

import { ActionType, IState, IAction } from './app-context.interface';

export const initialState = {
  screenProvider: null,
  isUpdating: true,
  hasUpdateError: false,
  errorMessage: '',
  user: {} as UserData,
  system: {} as SystemData,
  environment: {} as WalkMeEnvironment,
  originalUser: {} as UserData,
  dateRange: defaultDateRange,
};

export const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case ActionType.Updating:
      return {
        ...state,
        isUpdating: true,
        hasUpdateError: false,
        errorMessage: '',
      };
    case ActionType.UpdateSuccess:
      return {
        ...state,
        isUpdating: false,
        hasUpdateError: false,
        errorMessage: '',
      };
    case ActionType.UpdateError:
      return {
        ...state,
        isUpdating: false,
        hasUpdateError: true,
        errorMessage: action.errorMessage ?? initialState.errorMessage,
      };
    case ActionType.SetUser:
      return {
        ...state,
        user: action.user ?? initialState.user,
      };
    case ActionType.SetOriginalUser:
      return {
        ...state,
        originalUser: action.originalUser ?? initialState.originalUser,
      };
    case ActionType.SetSystem:
      return {
        ...state,
        system: action.system ?? initialState.system,
      };
    case ActionType.SetEnvironment:
      return {
        ...state,
        environment: action.environment ?? initialState.environment,
      };
    case ActionType.SetDateRange:
      return {
        ...state,
        dateRange: action.dateRange ?? initialState.dateRange,
      };
    case ActionType.CurrentScreenProvider:
      return {
        ...state,
        screenProvider: action.currentScreen,
      };
    case ActionType.ResetAppState:
      return { ...initialState };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
