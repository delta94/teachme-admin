import { createContext, useContext } from 'react';

import { getCourseList, exportCoursesData } from '../../walkme';
import { wmMessage } from '../../utils';

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

export const fetchCourseList = async (
  dispatch: IDispatch,
  envId = 0,
  from: string,
  to: string,
): Promise<void> => {
  dispatch({ type: ActionType.FetchCourses });

  try {
    const courses = await getCourseList(envId, from, to);

    dispatch({ type: ActionType.FetchCoursesSuccess, courses });
  } catch (error) {
    console.error(error);
    dispatch({ type: ActionType.FetchCoursesError });
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
    wmMessage('Export failed', 'error');
  }
};
