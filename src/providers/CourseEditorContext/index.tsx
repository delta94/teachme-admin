import React, { useReducer, ReactElement } from 'react';

import {
  ActionType,
  IAction,
  IState,
  IDispatch,
  ICourseEditorProvider,
} from './course-editor-context.interface';
import {
  CourseEditorStateContext,
  CourseEditorDispatchContext,
  useCourseEditorContext,
  fetchItemsList,
  fetchCourse,
} from './utils';
import { reducer, initialState } from './reducer';

export type { IAction, IState, IDispatch, ICourseEditorProvider };

export { useCourseEditorContext, fetchItemsList, fetchCourse, reducer, initialState, ActionType };

export default function CourseEditorProvider({ children }: ICourseEditorProvider): ReactElement {
  const [state, dispatch] = useReducer(reducer, initialState as IState);

  return (
    <CourseEditorStateContext.Provider value={state}>
      <CourseEditorDispatchContext.Provider value={dispatch}>
        {children}
      </CourseEditorDispatchContext.Provider>
    </CourseEditorStateContext.Provider>
  );
}
