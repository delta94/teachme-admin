import { UserData, ImpersonateData } from '@walkme/editor-sdk/dist/user';
import { WalkMeEnvironment } from '@walkme/editor-sdk/dist/environment';
import { SystemData } from '@walkme/editor-sdk/dist/system';

import { ActionType, IState, IAction } from './app-context.interface';

export const initialState = {
  screenProvider: null,
  isUpdating: true,
  hasUpdateError: false,
  errorMessage: '',
  user: {} as UserData,
  system: {} as SystemData,
  environment: {} as WalkMeEnvironment,
  impersonate: {} as ImpersonateData,
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
    case ActionType.SetImpersonate:
      return {
        ...state,
        impersonate: action.impersonate ?? initialState.impersonate,
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
