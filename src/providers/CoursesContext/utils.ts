import { createContext, useContext } from 'react';
import produce from 'immer';

import {
  getCourseList,
  getCoursesOverview,
  changeIndex,
  exportCoursesData,
  deleteCourse,
  publishCourses as _publishCourses,
  archiveCourses as _archiveCourses,
} from '../../walkme';
import { UICourse } from '../../walkme/data';
import { wmMessage, MessageType, pluralizer } from '../../utils';
import { EnvironmentType } from '../../interfaces/app.interfaces';

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
  envId: number,
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

export const sortTable = async (
  dispatch: IDispatch,
  prevCourses: Array<UICourse>,
  courseId: number,
  fromIndex: number,
  toIndex: number,
): Promise<void> => {
  dispatch({ type: ActionType.SortTable });

  try {
    await changeIndex(courseId, fromIndex, toIndex);

    const courses = produce(prevCourses, (draft) => {
      const moved = draft.splice(fromIndex, 1);
      draft.splice(toIndex, 0, moved[0]);
    });

    dispatch({ type: ActionType.SortTableSuccess, courses });
  } catch (error) {
    console.error(error);
    dispatch({ type: ActionType.SortTableError });
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
    wmMessage(`${pluralizer('Course', courses.length)} deleted successfully`);
  } catch (error) {
    console.error(error);
    dispatch({ type: ActionType.DeleteCoursesError });
    wmMessage('Delete process failed', MessageType.Error);
  }
};

const envNames = {
  [EnvironmentType.Production]: 'production',
  [EnvironmentType.Test]: 'test',
};

export const publishCourses = async (
  dispatch: IDispatch,
  envId = 0,
  courses: Array<UICourse>,
): Promise<void> => {
  dispatch({ type: ActionType.PublishCourses });

  try {
    const coursesIds = courses.map((course) => course.id);
    await _publishCourses(envId, coursesIds);

    dispatch({ type: ActionType.PublishCoursesSuccess });
    wmMessage(
      `${courses.length} ${pluralizer('course', courses.length)} published to ${
        envNames[envId as keyof typeof envNames]
      }`,
    );
  } catch (error) {
    console.error(error);
    dispatch({ type: ActionType.PublishCoursesError });
    wmMessage('Publish process failed', MessageType.Error);
  }
};

export const archiveCourses = async (
  dispatch: IDispatch,
  envId = 0,
  courses: Array<UICourse>,
): Promise<void> => {
  dispatch({ type: ActionType.ArchiveCourses });

  try {
    const coursesIds = courses.map((course) => course.id);
    await _archiveCourses(envId, coursesIds);

    dispatch({ type: ActionType.ArchiveCoursesSuccess });
    wmMessage(
      `${courses.length} ${pluralizer('course', courses.length)} archived to ${
        envNames[envId as keyof typeof envNames]
      }`,
    );
  } catch (error) {
    console.error(error);
    dispatch({ type: ActionType.ArchiveCoursesError });
    wmMessage('Archive process failed', MessageType.Error);
  }
};
