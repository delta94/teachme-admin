import { ActionType, IState, IAction } from './course-editor-context.interface';

export const initialState = {
  isFetchingItems: false,
  isFetchingItemsError: false,
  courseItems: [],
  filteredItems: [],
  courseTitle: 'Untitled Course',
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
        courseItems: action.items ?? initialState.courseItems,
        filteredItems: action.items ?? initialState.filteredItems,
      };
    case ActionType.FetchItemsError:
      return {
        ...state,
        isFetchingItems: false,
        isFetchingItemsError: true,
      };
    case ActionType.SetCourseTitle:
      return {
        ...state,
        courseTitle: action.courseTitle ?? initialState.courseTitle,
      };
    case ActionType.SetItemsSearchValue:
      return {
        ...state,
        itemsSearchValue: action.itemsSearchValue ?? initialState.itemsSearchValue,
        filteredItems: action.items ?? initialState.filteredItems,
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
