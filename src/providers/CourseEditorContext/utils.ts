import { createContext, useContext } from 'react';

import { getFlatItemsList } from '../../walkme';

import { IState, IDispatch } from './course-editor-context.interface';

export const CourseEditorStateContext = createContext<IState | undefined>(undefined);
export const CourseEditorDispatchContext = createContext<IDispatch | undefined>(undefined);

const useCourseEditorState = () => {
  const context = useContext(CourseEditorStateContext);

  if (context === undefined) {
    throw new Error('useCourseEditorState must be used within a CourseEditorProvider');
  }

  return context;
};

const useCourseEditorDispatch = () => {
  const context = useContext(CourseEditorDispatchContext);

  if (context === undefined) {
    throw new Error('useCourseEditorDispatch must be used within a CourseEditorProvider');
  }

  return context;
};

export const useCourseEditor = (): [IState, IDispatch] => [
  useCourseEditorState(),
  useCourseEditorDispatch(),
];

export const fetchItemsList = async (dispatch: IDispatch, envId = 0): Promise<void> => {
  dispatch({ type: 'FETCH_ITEMS' });

  try {
    const items = await getFlatItemsList(envId);

    dispatch({ type: 'FETCH_ITEMS_SUCCESS', items });
  } catch (error) {
    console.error(error);
    dispatch({ type: 'FETCH_ITEMS_ERROR' });
  }
};
