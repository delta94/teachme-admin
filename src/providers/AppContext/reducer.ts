import { IAppGlobals } from '../../utils/app-utils';
import { ActionType, IState, IAction } from './app-context.interface';

export const initialState = {
  screenProvider: null,
  isUpdating: true,
  hasUpdateError: false,
  errorMessage: '',
  globals: (null as unknown) as IAppGlobals,
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
        errorMessage: action.errorMsg,
      };
    case ActionType.CurrentScreenProvider:
      return {
        ...state,
        screenProvider: action.currentScreen,
      };
    case ActionType.UpdateGlobalsSuccess:
      return {
        ...state,
        isUpdating: false,
        globals: action.globals,
      };
    case ActionType.ResetAppState:
      return { ...initialState };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
