import { ReactNode } from 'react';

import { Course } from '../../walkme/data/courseBuild';
import { CourseOverviewData } from '../../walkme/models';
import { IDateRange } from '../../utils';

import { ActionType } from './actions';

export { ActionType };

export interface IAction {
  type: ActionType;
  overview?: CourseOverviewData;
  course?: Course;
  dateRange?: IDateRange;
}

export interface IDispatch {
  (action: IAction): void;
}

export interface IState {
  isFetchingCourseData: boolean;
  isFetchingCourseDataError: boolean;
  dateRange: IDateRange;
  overview: CourseOverviewData;
  course: Course;
  isExportingCourse: boolean;
  isExportingCourseError: boolean;
}

export interface ICourseProvider {
  children: ReactNode;
}
