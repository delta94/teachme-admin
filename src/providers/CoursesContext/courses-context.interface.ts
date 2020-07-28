import { ReactNode } from 'react';

import { AllCoursesOverviewResponse } from '../../walkme/models/overview';
import { UICourse } from '../../walkme/data';
import { IDateRange } from '../../utils';

import { ActionType } from './actions';

export { ActionType };

export interface IAction {
  type: ActionType;
  courses?: Array<UICourse> | null;
  overview?: AllCoursesOverviewResponse;
  dateRange?: IDateRange;
}

export interface IDispatch {
  (action: IAction): void;
}

export interface IState {
  isFetchingCourses: boolean;
  isFetchingCoursesError: boolean;
  dateRange: IDateRange;
  courses: Array<UICourse>;
  overview: AllCoursesOverviewResponse;
}

export interface ICoursesProvider {
  children: ReactNode;
}
