import produce from 'immer';

import { CourseOverviewData } from '../../walkme/models';
import { defaultDateRange } from '../../utils';
import { ICourseOutlineItem } from '../../components/Screen/CourseScreen/utils';

import { ActionType, IState, IAction } from './course-context.interface';

export const initialState = {
  isFetchingCourseData: false,
  isFetchingCourseDataError: false,
  dateRange: defaultDateRange,
  overview: {} as CourseOverviewData,
  course: {},
  courseOutline: [] as ICourseOutlineItem[],
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
        draft.course = action.course ?? initialState.course;
        draft.quiz = action.quiz ?? initialState.quiz;
        draft.courseOutline = action.courseOutline ?? initialState.courseOutline;
        break;
      case ActionType.FetchCourseDataError:
        draft.isFetchingCourseData = false;
        draft.isFetchingCourseDataError = true;
        break;
      case ActionType.SetDateRange:
        draft.dateRange = action.dateRange ?? initialState.dateRange;
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
