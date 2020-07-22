import produce from 'immer';

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
  filteredCourseOutline: [],
  courseOutlineSearchValue: '',
  isDetailsPanelOpen: false,
} as IState;

export const reducer = produce(
  (draft: IState, action: IAction): IState => {
    switch (action.type) {
      case ActionType.FetchItems:
        draft.isFetchingItems = true;
        draft.isFetchingItemsError = false;
        break;
      case ActionType.FetchItemsSuccess:
        draft.isFetchingItems = false;
        draft.isFetchingItemsError = false;
        draft.courseItems = action.courseItems ?? initialState.courseItems;
        draft.filteredCourseItems = action.courseItems ?? initialState.filteredCourseItems;
        break;
      case ActionType.FetchItemsError:
        draft.isFetchingItems = false;
        draft.isFetchingItemsError = true;
        break;
      case ActionType.SetCourseTitle:
        draft.courseTitle = action.courseTitle ?? initialState.courseTitle;
        break;
      case ActionType.SetCourseItemsSearchValue:
        draft.courseItemsSearchValue =
          action.courseItemsSearchValue ?? initialState.courseItemsSearchValue;
        draft.filteredCourseItems = action.courseItems ?? initialState.filteredCourseItems;
        break;
      case ActionType.FetchCourse:
        draft.isFetchingCourse = true;
        draft.isFetchingCourseError = false;
        break;
      case ActionType.FetchCourseSuccess:
        draft.isFetchingCourse = false;
        draft.isFetchingCourseError = false;
        draft.course = action.course ?? initialState.course;
        break;
      case ActionType.FetchCourseError:
        draft.isFetchingCourse = false;
        draft.isFetchingCourseError = true;
        break;
      case ActionType.UpdateCourseOutline:
        break;
      case ActionType.SetCourseOutlineSearchValue:
        draft.courseOutlineSearchValue =
          action.courseOutlineSearchValue ?? initialState.courseOutlineSearchValue;
        draft.filteredCourseOutline = action.course?.items ?? initialState.filteredCourseOutline;
        break;
      case ActionType.ToggleDetailsPanel:
        draft.isDetailsPanelOpen = !draft.isDetailsPanelOpen;
        break;
      case ActionType.ResetCourseEditor:
        draft = { ...initialState };
        break;
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }

    return draft;
  },
);
