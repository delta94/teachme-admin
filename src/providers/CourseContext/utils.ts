import { createContext, useContext } from 'react';

import { getCourseOverview, exportCoursesData, getCourse, getQuizData } from '../../walkme';
import { wmMessage, MessageType } from '../../utils';

import { ActionType, IState, IDispatch } from './course-context.interface';

export const CourseStateContext = createContext<IState | undefined>(undefined);
export const CourseDispatchContext = createContext<IDispatch | undefined>(undefined);

const useCourseState = () => {
  const context = useContext(CourseStateContext);

  if (context === undefined) {
    throw new Error('useCoursesState must be used within a CoursesProvider');
  }

  return context;
};

const useCourseDispatch = () => {
  const context = useContext(CourseDispatchContext);

  if (context === undefined) {
    throw new Error('useCoursesDispatch must be used within a CoursesProvider');
  }

  return context;
};

export const useCourseContext = (): [IState, IDispatch] => [useCourseState(), useCourseDispatch()];

export const fetchCourseData = async (
  dispatch: IDispatch,
  courseId: number,
  envId = 0,
  from: string,
  to: string,
): Promise<void> => {
  dispatch({ type: ActionType.FetchCourseData });
  const id = +courseId;

  try {
    const course = await getCourse(id, envId);
    const overview = await getCourseOverview(id, envId, from, to);

    dispatch({ type: ActionType.FetchCourseDataSuccess, course, overview });
  } catch (error) {
    console.error(error);
    dispatch({ type: ActionType.FetchCourseDataError });
  }
};

export const exportCourse = async (
  dispatch: IDispatch,
  envId = 0,
  from: string,
  to: string,
): Promise<void> => {
  dispatch({ type: ActionType.ExportCourse });

  try {
    await exportCoursesData(envId, from, to);

    dispatch({ type: ActionType.ExportCourseSuccess });
    wmMessage('Export completed');
  } catch (error) {
    console.error(error);
    dispatch({ type: ActionType.ExportCourseError });
    wmMessage('Export failed', MessageType.Error);
  }
};
