import { ActionType, IState, IAction } from './walkme-context.interface';

export const initialState = {
  walkmeSDK: null,
};

export const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case ActionType.SetSDK:
      return {
        ...state,
        walkmeSDK: action.walkme,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
