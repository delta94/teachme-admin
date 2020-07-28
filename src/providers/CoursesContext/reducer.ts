import produce from 'immer';

import { ActionType, IState, IAction } from './courses-context.interface';

export const initialState = {
  isFetchingCourses: false,
  isFetchingCoursesError: false,
  courses: [],
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
        break;
      case ActionType.FetchCoursesError:
        draft.isFetchingCourses = false;
        draft.isFetchingCoursesError = true;
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
