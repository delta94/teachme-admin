import produce from 'immer';

import { AllCoursesOverviewResponse } from '../../walkme/models';
import { defaultDateRange } from '../../utils';
import { ActionType, IState, IAction } from './courses-context.interface';

export const initialState = {
  isFetchingCourses: false,
  isFetchingCoursesError: false,
  dateRange: defaultDateRange,
  courses: [],
  overview: {} as AllCoursesOverviewResponse,
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
        draft.overview = action.overview ?? initialState.overview;
        break;
      case ActionType.FetchCoursesError:
        draft.isFetchingCourses = false;
        draft.isFetchingCoursesError = true;
        break;
      case ActionType.SetDateRange:
        draft.dateRange = action.dateRange ?? initialState.dateRange;
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
