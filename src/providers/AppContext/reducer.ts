import { ActionType, IState, IAction } from './app-context.interface';

export const initialState = {
  screenProvider: null,
  isUpdating: false,
  hasUpdateError: false,
  errorMessage: '',
  user: null,
  environment: null,
  system: null,
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
        errorMessage: 'Update Error',
      };
    case ActionType.CurrentScreenProvider:
      return {
        ...state,
        screenProvider: action.currentScreen,
      };
    case ActionType.SetUser:
      return {
        ...state,
        user: action.user,
      };
    case ActionType.SetEnvironment:
      return {
        ...state,
        environment: action.environment,
      };
    case ActionType.SetSystem:
      return {
        ...state,
        system: action.system,
      };
    case ActionType.ResetAppState:
      return { ...initialState };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
