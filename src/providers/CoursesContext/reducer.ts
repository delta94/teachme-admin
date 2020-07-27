import produce from 'immer';

import { ActionType, IState, IAction } from './courses-context.interface';

export const initialState = {
  isFetchingCourses: false,
  isFetchingCoursesError: false,
  courses: [],
  filteredCourses: [],
  coursesSearchValue: '',
  selectedRows: [],
  selectedRowKeys: [],
  isExportingCourses: false,
  isExportingCoursesError: false,
} as IState;

export const reducer = produce(
  (draft: IState, action: IAction): IState => {
    switch (action.type) {
      case ActionType.FetchCourses:
        draft.isFetchingCourses = true;
        draft.isFetchingCoursesError = false;
        break;
      case ActionType.FetchCoursesSuccess:
        draft.isFetchingCourses = false;
        draft.isFetchingCoursesError = false;
        draft.courses = action.courses ?? initialState.courses;
        draft.filteredCourses = action.courses ?? initialState.filteredCourses;
        break;
      case ActionType.FetchCoursesError:
        draft.isFetchingCourses = false;
        draft.isFetchingCoursesError = true;
        break;
      case ActionType.SetCoursesSearchValue:
        draft.coursesSearchValue = action.coursesSearchValue ?? initialState.coursesSearchValue;
        draft.filteredCourses = action.courses ?? initialState.filteredCourses;
        break;
      case ActionType.SetSelectedRows:
        draft.selectedRows = action.courses ?? initialState.selectedRows;
        draft.selectedRowKeys = action.selectedRowKeys ?? initialState.selectedRowKeys;
        break;
      case ActionType.ExportCourses:
        draft.isExportingCourses = true;
        draft.isExportingCoursesError = false;
        break;
      case ActionType.ExportCoursesSuccess:
        draft.isExportingCourses = false;
        draft.isExportingCoursesError = false;
        break;
      case ActionType.ExportCoursesError:
        draft.isExportingCourses = false;
        draft.isExportingCoursesError = true;
        break;
      case ActionType.ResetCourses:
        draft = { ...initialState };
        break;
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }

    return draft;
  },
);
