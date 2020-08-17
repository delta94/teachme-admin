import { createContext, useContext } from 'react';

import { getCourseOverview, exportCourseOutline, getQuizData } from '../../walkme';
import { wmMessage, MessageType } from '../../utils';
import { parseCourseOutline } from '../../components/Screen/CourseScreen';
import { getCourseOutline } from '../../walkme/data/courseOutline';
import { getCourseMetadata } from '../../walkme/data/courseMetadata';

import { ActionType, IState, IDispatch } from './course-context.interface';
import { CourseNotFoundError, TypeNotSupportedError } from '../../walkme/models';

import { History } from 'history';
import { COURSES_ROUTE } from '../../constants/routes';

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
  history: History,
): Promise<void> => {
  dispatch({ type: ActionType.FetchCourseData });
  const id = +courseId;

  try {
    const [courseMetadata, courseOutline, quiz, overview] = await Promise.all([
      getCourseMetadata(id, envId),
      getCourseOutline(id, envId, from, to),
      getQuizData(id, envId, from, to),
      getCourseOverview(id, envId, from, to),
    ]);

    const convertedCourseOutline = parseCourseOutline(courseOutline!);

    dispatch({
      type: ActionType.FetchCourseDataSuccess,
      courseMetadata,
      overview,
      courseOutline: {
        dropOffEnabled: courseOutline.dropOffEnabled,
        items: convertedCourseOutline,
      },
      filteredCourseOutline: convertedCourseOutline,
      quiz,
    });
  } catch (error) {
    console.error(error);
    dispatch({ type: ActionType.FetchCourseDataError });
    const errorMessage = getCourseErrorMessage(error, courseId);
    wmMessage(errorMessage, MessageType.Error);
    history.replace(`${COURSES_ROUTE.path}`);
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

function getCourseErrorMessage(error: Error, courseId: number): string {
  switch (true) {
    case error instanceof CourseNotFoundError:
      return `Cannot find course with id ${courseId}`;
    case error instanceof TypeNotSupportedError:
      return `This course contains unsupported items`;
    default:
      return 'Unable to get course';
  }
}
