import { createContext, useContext } from 'react';

import { getCourseList, getCoursesOverview } from '../../walkme';
import { getAllCoursesOverview } from '../../walkme/analytics';

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
  dispatch({ type: ActionType.FetchCourses });

  try {
    const courses = await getCourseList(envId, from, to);
    const overview = await getCoursesOverview(envId, from, to);

    dispatch({ type: ActionType.FetchCoursesSuccess, courses, overview });
  } catch (error) {
    console.error(error);
    dispatch({ type: ActionType.FetchCoursesError });
  }
};
