import { createContext, useContext } from 'react';
import { message } from 'antd';
import { History } from 'history';

import { getFlatItemsList, getCourse, getNewCourse } from '../../walkme';
import { COURSES_ROUTE } from '../../constants/routes';

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
    const courseItems = await getFlatItemsList(envId, true);

    dispatch({ type: ActionType.FetchItemsSuccess, courseItems });
  } catch (error) {
    console.error(error);
    dispatch({ type: ActionType.FetchItemsError });
  }
};

export const fetchCourse = async (
  dispatch: IDispatch,
  courseId: string | number | undefined,
  envId = 0,
  history: History,
): Promise<void> => {
  dispatch({ type: ActionType.FetchCourse });
  const numberCourseId = courseId ? +courseId : undefined;

  try {
    const course =
      numberCourseId !== undefined ? await getCourse(numberCourseId, envId) : await getNewCourse();

    dispatch({ type: ActionType.FetchCourseSuccess, course });

    if (course) {
      dispatch({ type: ActionType.UpdateCourseOutline });
    }
  } catch (error) {
    console.error(error);
    message.error(`Course '${courseId}' not found`);
    history.push(COURSES_ROUTE.path);
    dispatch({ type: ActionType.FetchCourseError });
  }
};
