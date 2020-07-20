import { createContext, useContext } from 'react';

import { getFlatItemsList, getCourse } from '../../walkme';

import { ActionType, IState, IDispatch } from './course-editor-context.interface';

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

export const useCourseEditorContext = (): [IState, IDispatch] => [
  useCourseEditorState(),
  useCourseEditorDispatch(),
];

export const fetchItemsList = async (dispatch: IDispatch, envId = 0): Promise<void> => {
  dispatch({ type: ActionType.FetchItems });

  try {
    const courseItems = await getFlatItemsList(envId);

    dispatch({ type: ActionType.FetchItemsSuccess, courseItems });
  } catch (error) {
    console.error(error);
    dispatch({ type: ActionType.FetchItemsError });
  }
};

export const fetchCourse = async (
  dispatch: IDispatch,
  courseId: number,
  envId = 0,
): Promise<void> => {
  dispatch({ type: ActionType.FetchCourse });

  try {
    const course = await getCourse(courseId, envId);

    dispatch({ type: ActionType.FetchCourseSuccess, course });

    if (course) {
      dispatch({ type: ActionType.SetCourseTitle, courseTitle: course.title });
      dispatch({ type: ActionType.UpdateCourseOutline, courseOutline: course.items.toArray() });
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: ActionType.FetchCourseError });
  }
};
