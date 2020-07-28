import { createContext, useContext } from 'react';

import { getCourseList, getCoursesOverview, exportCoursesData, deleteCourse } from '../../walkme';
import { UICourse } from '../../walkme/data';
import { wmMessage, MessageType } from '../../utils';

import { ActionType, IState, IDispatch } from './courses-context.interface';

export const CoursesStateContext = createContext<IState | undefined>(undefined);
export const CoursesDispatchContext = createContext<IDispatch | undefined>(undefined);

const useCoursesState = () => {
  const context = useContext(CoursesStateContext);

  if (context === undefined) {
    throw new Error('useCoursesState must be used within a CoursesProvider');
  }

  return context;
};

const useCoursesDispatch = () => {
  const context = useContext(CoursesDispatchContext);

  if (context === undefined) {
    throw new Error('useCoursesDispatch must be used within a CoursesProvider');
  }

  return context;
};

export const useCoursesContext = (): [IState, IDispatch] => [
  useCoursesState(),
  useCoursesDispatch(),
];

export const fetchCoursesData = async (
  dispatch: IDispatch,
  envId = 0,
  from: string,
  to: string,
): Promise<void> => {
  dispatch({ type: ActionType.FetchCoursesData });

  try {
    const courses = await getCourseList(envId, from, to);
    const overview = await getCoursesOverview(envId, from, to);

    dispatch({ type: ActionType.FetchCoursesDataSuccess, courses, overview });
  } catch (error) {
    console.error(error);
    dispatch({ type: ActionType.FetchCoursesDataError });
  }
};

export const exportCourses = async (
  dispatch: IDispatch,
  envId = 0,
  from: string,
  to: string,
): Promise<void> => {
  dispatch({ type: ActionType.ExportCourses });

  try {
    await exportCoursesData(envId, from, to);

    dispatch({ type: ActionType.ExportCoursesSuccess });
    wmMessage('Export completed');
  } catch (error) {
    console.error(error);
    dispatch({ type: ActionType.ExportCoursesError });
    wmMessage('Export failed', MessageType.Error);
  }
};

export const deleteCourses = async (
  dispatch: IDispatch,
  courses: Array<UICourse>,
): Promise<void> => {
  dispatch({ type: ActionType.DeleteCourses });

  try {
    for (const course of courses) {
      await deleteCourse(course.id);
    }

    dispatch({ type: ActionType.DeleteCoursesSuccess });
    wmMessage(`Course${courses.length > 1 ? 's' : ''} deleted successfully`);
  } catch (error) {
    console.error(error);
    dispatch({ type: ActionType.DeleteCoursesError });
    wmMessage('Delete process failed', MessageType.Error);
  }
};
