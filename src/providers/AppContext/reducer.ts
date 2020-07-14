import { ActionType, IState, IAction } from './app-context.interface';

export const initialState = {
  screenProvider: null,
  isLoading: false,
  hasLoadingError: false,
  isUpdating: false,
  hasUpdateError: false,
  errorMessage: '',
};

export const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case ActionType.Loading:
      return {
        ...state,
        isLoading: true,
        hasLoadingError: false,
        errorMessage: '',
      };
    case ActionType.LoadingSuccess:
      return {
        ...state,
        isLoading: false,
        hasLoadingError: false,
        errorMessage: '',
      };
    case ActionType.LoadingError:
      return {
        ...state,
        isLoading: false,
        hasLoadingError: true,
        errorMessage: 'Loading error',
      };
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
    case ActionType.ResetAppState:
      return { ...initialState };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
