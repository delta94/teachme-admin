import { createContext, useContext } from 'react';

import { getFlatItemsList, getCourse, getNewCourse } from '../../walkme';

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
  courseId: string | undefined,
  envId = 0,
): Promise<void> => {
  dispatch({ type: ActionType.FetchCourse });

  try {
    // TODO: replace hard-coded courseId with variable
    const course = courseId !== undefined ? await getCourse(1284870, envId) : await getNewCourse();

    dispatch({ type: ActionType.FetchCourseSuccess, course });

    if (course) {
      dispatch({ type: ActionType.SetCourseTitle, courseTitle: course.title });
      dispatch({ type: ActionType.UpdateCourseOutline });
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: ActionType.FetchCourseError });
  }
};
