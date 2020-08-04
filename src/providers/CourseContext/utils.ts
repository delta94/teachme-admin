import { createContext, useContext } from 'react';

import { getCourseOverview, getCourse, exportCourseOutline, getQuizData } from '../../walkme';
import { wmMessage, MessageType } from '../../utils';
import { parseCourseOutline } from '../../components/Screen/CourseScreen';
import { getCourseOutline } from '../../walkme/data/courseOutline';
import { getCourseSegments } from '../../walkme/data/services/segments';

import { ActionType, IState, IDispatch } from './course-context.interface';

export const CourseStateContext = createContext<IState | undefined>(undefined);
export const CourseDispatchContext = createContext<IDispatch | undefined>(undefined);

const useCourseState = () => {
  const context = useContext(CourseStateContext);

  if (context === undefined) {
    throw new Error('useCourseState must be used within a CourseProvider');
  }

  return context;
};

const useCourseDispatch = () => {
  const context = useContext(CourseDispatchContext);

  if (context === undefined) {
    throw new Error('useCourseDispatch must be used within a CourseProvider');
  }

  return context;
};

export const useCourseContext = (): [IState, IDispatch] => [useCourseState(), useCourseDispatch()];

export const fetchCourseData = async (
  dispatch: IDispatch,
  courseId: number,
  envId: number,
  from: string,
  to: string,
): Promise<void> => {
  dispatch({ type: ActionType.FetchCourseData });
  const id = +courseId;

  try {
    const course = await getCourse(id, envId); // TODO: should remove after getting all properties in courseOutline
    const courseSegments = await getCourseSegments(id, envId); // TODO: should remove after getting all properties in courseOutline
    /**
     * TODO:
     * ask Eli to add the following properties to courseOutline:
     * course-title, course-id, segments, publish-status
     * */
    const courseOutline = await getCourseOutline(id, envId, from, to);
    const convertedCourseOutline = parseCourseOutline(courseOutline);
    const quiz = await getQuizData(id, envId, from, to);
    const overview = await getCourseOverview(id, envId, from, to);

    dispatch({
      type: ActionType.FetchCourseDataSuccess,
      course,
      overview,
      courseOutline: convertedCourseOutline,
      filteredCourseOutline: convertedCourseOutline,
      quiz,
      courseSegments,
    });
  } catch (error) {
    console.error(error);
    dispatch({ type: ActionType.FetchCourseDataError });
  }
};

export const exportCourse = async (
  dispatch: IDispatch,
  courseId: number,
  envId: number,
  from: string,
  to: string,
): Promise<void> => {
  dispatch({ type: ActionType.ExportCourse });

  try {
    await exportCourseOutline(courseId, envId, from, to);

    dispatch({ type: ActionType.ExportCourseSuccess });
    wmMessage('Export completed');
  } catch (error) {
    console.error(error);
    dispatch({ type: ActionType.ExportCourseError });
    wmMessage('Export failed', MessageType.Error);
  }
};
