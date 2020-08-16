import produce from 'immer';

import { CourseOverviewData } from '../../walkme/models';
import { ICourseOutlineItems, ICourseOutline } from '../../components/Screen/CourseScreen';

import { ActionType, IState, IAction } from './course-context.interface';

export const initialState = {
  isFetchingCourseData: false,
  isFetchingCourseDataError: false,
  overview: {} as CourseOverviewData,
  courseMetadata: {},
  courseOutline: {} as ICourseOutline,
  filteredCourseOutline: [] as ICourseOutlineItems,
  courseOutlineSearchValue: '',
  quiz: {},
  isExportingCourse: false,
  isExportingCourseError: false,
} as IState;

export const reducer = produce(
  (draft: IState, action: IAction): IState => {
    switch (action.type) {
      case ActionType.FetchCourseData:
        draft.isFetchingCourseData = true;
        draft.isFetchingCourseDataError = false;
        break;
      case ActionType.FetchCourseDataSuccess:
        draft.isFetchingCourseData = false;
        draft.isFetchingCourseDataError = false;
        draft.overview = action.overview ?? initialState.overview;
        draft.courseMetadata = action.courseMetadata ?? initialState.courseMetadata;
        draft.quiz = action.quiz ?? initialState.quiz;
        draft.courseOutline = action.courseOutline ?? initialState.courseOutline;
        draft.filteredCourseOutline =
          action.filteredCourseOutline ?? initialState.filteredCourseOutline;
        break;
      case ActionType.FetchCourseDataError:
        draft.isFetchingCourseData = false;
        draft.isFetchingCourseDataError = true;
        break;
      case ActionType.SetCourseOutlineSearchValue:
        draft.courseOutlineSearchValue =
          action.courseOutlineSearchValue ?? initialState.courseOutlineSearchValue;
        draft.filteredCourseOutline =
          action.filteredCourseOutline ?? initialState.filteredCourseOutline;
        break;
      case ActionType.ExportCourse:
        draft.isExportingCourse = true;
        draft.isExportingCourseError = false;
        break;
      case ActionType.ExportCourseSuccess:
        draft.isExportingCourse = false;
        draft.isExportingCourseError = false;
        break;
      case ActionType.ExportCourseError:
        draft.isExportingCourse = false;
        draft.isExportingCourseError = true;
        break;
      case ActionType.ResetCourse:
        draft = { ...initialState };
        break;
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }

    return draft;
  },
);
