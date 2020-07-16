import { ActionType, IState, IAction } from './course-editor-context.interface';

export const initialState = {
  isFetchingItems: false,
  isFetchingItemsError: false,
  courseItems: [],
  filteredItems: [],
  itemsSearchValue: '',
  isDetailsPanelOpen: false,
};

export const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case ActionType.FetchItems:
      return {
        ...state,
        isFetchingItems: true,
        isFetchingItemsError: false,
      };
    case ActionType.FetchItemsSuccess:
      return {
        ...state,
        isFetchingItems: false,
        isFetchingItemsError: false,
        courseItems: action.items,
        filteredItems: action.items,
      };
    case ActionType.FetchItemsError:
      return {
        ...state,
        isFetchingItems: false,
        isFetchingItemsError: true,
      };
    case ActionType.SetItemsSearchValue:
      return {
        ...state,
        itemsSearchValue: action.itemsSearchValue,
        filteredItems: action.items,
      };
    case ActionType.ToggleDetailsPanel:
      return {
        ...state,
        isDetailsPanelOpen: !state.isDetailsPanelOpen,
      };
    case ActionType.ResetCourseEditor:
      return { ...initialState };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};