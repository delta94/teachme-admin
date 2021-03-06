import produce from 'immer';

import { AllCoursesOverviewResponse } from '../../walkme/models';

import { ActionType, IState, IAction } from './courses-context.interface';

export const initialState = {
  isFetchingCoursesData: false,
  isFetchingCoursesDataError: false,
  overview: {} as AllCoursesOverviewResponse,
  courses: [],
  filteredCourses: [],
  coursesSearchValue: '',
  selectedRows: [],
  selectedRowIds: [],
  isSortingCourses: false,
  isSortingCoursesError: false,
  isExportingCourses: false,
  isExportingCoursesError: false,
  isDeletingCourses: false,
  isDeletingCoursesError: false,
  isPublishingCourses: false,
  isPublishingCoursesError: false,
  isArchivingCourses: false,
  isArchivingCoursesError: false,
} as IState;

export const reducer = produce(
  (draft: IState, action: IAction): IState => {
    switch (action.type) {
      case ActionType.FetchCoursesData:
        draft.isFetchingCoursesData = true;
        draft.isFetchingCoursesDataError = false;
        break;
      case ActionType.FetchCoursesDataSuccess:
        draft.isFetchingCoursesData = false;
        draft.isFetchingCoursesDataError = false;
        draft.overview = action.overview ?? initialState.overview;
        draft.courses = action.courses ?? initialState.courses;
        draft.filteredCourses = action.courses ?? initialState.filteredCourses;
        break;
      case ActionType.FetchCoursesDataError:
        draft.isFetchingCoursesData = false;
        draft.isFetchingCoursesDataError = true;
        break;
      case ActionType.SetCoursesSearchValue:
        draft.coursesSearchValue = action.coursesSearchValue ?? initialState.coursesSearchValue;
        draft.filteredCourses = action.courses ?? initialState.filteredCourses;
        break;
      case ActionType.SetSelectedRows:
        draft.selectedRows = action.courses ?? initialState.selectedRows;
        draft.selectedRowIds = action.selectedRowIds ?? initialState.selectedRowIds;
        break;
      case ActionType.UpdateCoursesTable:
        draft.courses = action.courses ?? initialState.courses;
        draft.filteredCourses = action.courses ?? initialState.filteredCourses;
        draft.selectedRowIds = action.selectedRowIds ?? initialState.selectedRowIds;
        break;
      case ActionType.SortTable:
        draft.isSortingCourses = true;
        draft.isSortingCoursesError = false;
        break;
      case ActionType.SortTableSuccess:
        draft.isSortingCourses = false;
        draft.isSortingCoursesError = false;
        break;
      case ActionType.SortTableError:
        draft.isSortingCourses = false;
        draft.isSortingCoursesError = true;
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
      case ActionType.DeleteCourses:
        draft.isDeletingCourses = true;
        draft.isDeletingCoursesError = false;
        break;
      case ActionType.DeleteCoursesSuccess:
        draft.isDeletingCourses = false;
        draft.isDeletingCoursesError = false;
        break;
      case ActionType.DeleteCoursesError:
        draft.isDeletingCourses = false;
        draft.isDeletingCoursesError = true;
        break;
      case ActionType.PublishCourses:
        draft.isPublishingCourses = true;
        draft.isPublishingCoursesError = false;
        break;
      case ActionType.PublishCoursesSuccess:
        draft.isPublishingCourses = false;
        draft.isPublishingCoursesError = false;
        break;
      case ActionType.PublishCoursesError:
        draft.isPublishingCourses = false;
        draft.isPublishingCoursesError = true;
        break;
      case ActionType.ArchiveCourses:
        draft.isArchivingCourses = true;
        draft.isArchivingCoursesError = false;
        break;
      case ActionType.ArchiveCoursesSuccess:
        draft.isArchivingCourses = false;
        draft.isArchivingCoursesError = false;
        break;
      case ActionType.ArchiveCoursesError:
        draft.isArchivingCourses = false;
        draft.isArchivingCoursesError = true;
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
