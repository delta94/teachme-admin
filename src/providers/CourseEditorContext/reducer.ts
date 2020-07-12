import { IState, IAction } from './course-editor-context.interface';

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
    case 'FETCH_ITEMS':
      return {
        ...state,
        isFetchingItems: true,
        isFetchingItemsError: false,
      };
    case 'FETCH_ITEMS_SUCCESS':
      return {
        ...state,
        isFetchingItems: false,
        isFetchingItemsError: false,
        courseItems: action.items,
        filteredItems: action.items,
      };
    case 'FETCH_ITEMS_ERROR':
      return {
        ...state,
        isFetchingItems: false,
        isFetchingItemsError: true,
      };
    case 'SET_ITEMS_SEARCH_VALUE':
      return {
        ...state,
        itemsSearchValue: action.itemsSearchValue,
        filteredItems: action.items,
      };
    case 'TOGGLE_DETAILS_PANEL':
      return {
        ...state,
        isDetailsPanelOpen: !state.isDetailsPanelOpen,
      };
    case 'RESET_COURSE_EDITOR':
      return { ...initialState };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
