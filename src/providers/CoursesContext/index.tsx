import React, { useReducer, ReactElement } from 'react';

import {
  ActionType,
  IAction,
  IState,
  IDispatch,
  ICoursesProvider,
} from './courses-context.interface';
import {
  CoursesStateContext,
  CoursesDispatchContext,
  useCoursesContext,
  fetchCoursesData,
  sortTable,
  exportCourses,
  deleteCourses,
  publishCourses,
  archiveCourses,
} from './utils';
import { reducer, initialState } from './reducer';

export type { IAction, IState, IDispatch, ICoursesProvider };

export {
  useCoursesContext,
  fetchCoursesData,
  sortTable,
  exportCourses,
  deleteCourses,
  publishCourses,
  archiveCourses,
  reducer,
  initialState,
  ActionType,
};

export default function CoursesProvider({ children }: ICoursesProvider): ReactElement {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CoursesStateContext.Provider value={state}>
      <CoursesDispatchContext.Provider value={dispatch}>{children}</CoursesDispatchContext.Provider>
    </CoursesStateContext.Provider>
  );
}
