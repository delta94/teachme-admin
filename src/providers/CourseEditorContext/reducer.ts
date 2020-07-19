import { ActionType, IState, IAction } from './course-editor-context.interface';

export const initialState = {
  courseTitle: 'Untitled Course',
  isFetchingItems: false,
  isFetchingItemsError: false,
  courseItems: [],
  filteredCourseItems: [],
  courseItemsSearchValue: '',
  isFetchingCourse: false,
  isFetchingCourseError: false,
  course: null,
  courseOutline: [],
  filteredCourseOutline: [],
  courseOutlineSearchValue: '',
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
        courseItems: action.courseItems ?? initialState.courseItems,
        filteredCourseItems: action.courseItems ?? initialState.filteredCourseItems,
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
    case ActionType.SetCourseItemsSearchValue:
      return {
        ...state,
        courseItemsSearchValue:
          action.courseItemsSearchValue ?? initialState.courseItemsSearchValue,
        filteredCourseItems: action.courseItems ?? initialState.filteredCourseItems,
      };
    case ActionType.FetchCourse:
      return {
        ...state,
        isFetchingCourse: true,
        isFetchingCourseError: false,
      };
    case ActionType.FetchCourseSuccess:
      return {
        ...state,
        isFetchingCourse: false,
        isFetchingCourseError: false,
        course: action.course ?? initialState.course,
      };
    case ActionType.FetchCourseError:
      return {
        ...state,
        isFetchingCourse: false,
        isFetchingCourseError: true,
      };
    case ActionType.UpdateCourseOutline:
      return {
        ...state,
        courseOutline:
          action.courseOutline ?? (state.course ? state.course.items : initialState.courseOutline),
        filteredCourseOutline: action.courseOutline ?? initialState.filteredCourseOutline,
      };
    case ActionType.SetCourseOutlineSearchValue:
      return {
        ...state,
        courseOutlineSearchValue:
          action.courseOutlineSearchValue ?? initialState.courseOutlineSearchValue,
        filteredCourseOutline: action.courseOutline ?? initialState.filteredCourseOutline,
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
