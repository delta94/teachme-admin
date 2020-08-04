import produce from 'immer';

import { ActionType, IState, IAction } from './course-editor-context.interface';

export const initialState = {
  isFetchingItems: false,
  isFetchingItemsError: false,
  courseItems: [],
  filteredCourseItems: [],
  courseItemsSearchValue: '',
  isFetchingCourse: false,
  isFetchingCourseError: false,
  course: null,
  quiz: null,
  filteredCourseOutline: [],
  refreshCourseOutline: false,
  courseOutlineSearchValue: '',
  isDetailsPanelOpen: false,
  activeDetailsItem: null,
  hasChanges: false,
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
        draft.quiz = action.course?.quiz ?? null;
        break;
      case ActionType.FetchCourseError:
        draft.isFetchingCourse = false;
        draft.isFetchingCourseError = true;
        break;
      case ActionType.AddQuiz:
        draft.quiz = draft.course?.addQuiz() ?? null;
        draft.hasChanges = true;
        break;
      case ActionType.DeleteQuiz:
        draft.course?.deleteQuiz();
        draft.quiz = null;
        draft.hasChanges = true;
        break;
      case ActionType.UpdateCourseOutline:
        draft.refreshCourseOutline = !draft.refreshCourseOutline;
        draft.hasChanges =
          action.updateHasChange !== undefined ? action.updateHasChange : draft.hasChanges;
        // on delete activeDetailsItem should close the details panel and reset activeDetailsItem to null
        if (action.closeDetailsPanel) {
          draft.isDetailsPanelOpen = false;
          draft.activeDetailsItem = null;
        }
        break;
      case ActionType.SetCourseOutlineSearchValue:
        draft.courseOutlineSearchValue =
          action.courseOutlineSearchValue ?? initialState.courseOutlineSearchValue;
        draft.filteredCourseOutline = action.course?.items ?? initialState.filteredCourseOutline;
        break;
      case ActionType.OpenDetailsPanel:
        draft.isDetailsPanelOpen = true;
        draft.activeDetailsItem = action.activeDetailsItem ?? null;
        break;
      case ActionType.CloseDetailsPanel:
        draft.isDetailsPanelOpen = false;
        draft.activeDetailsItem = null;
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
