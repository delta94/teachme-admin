import React, { useReducer, ReactElement } from 'react';

import {
  ActionType,
  IAction,
  IState,
  IDispatch,
  ICourseProvider,
} from './course-context.interface';
import {
  CourseStateContext,
  CourseDispatchContext,
  useCourseContext,
  fetchCourseData,
  exportCourse,
} from './utils';
import { reducer, initialState } from './reducer';

export type { IAction, IState, IDispatch, ICourseProvider };

export { useCourseContext, fetchCourseData, exportCourse, reducer, initialState, ActionType };

export default function CourseProvider({ children }: ICourseProvider): ReactElement {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CourseStateContext.Provider value={state}>
      <CourseDispatchContext.Provider value={dispatch}>{children}</CourseDispatchContext.Provider>
    </CourseStateContext.Provider>
  );
}
