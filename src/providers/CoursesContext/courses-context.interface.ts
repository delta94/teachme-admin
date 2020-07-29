import { ReactNode, Key } from 'react';

import { AllCoursesOverviewResponse } from '../../walkme/models/overview';
import { UICourse } from '../../walkme/data';
import { IDateRange } from '../../utils';

import { ActionType } from './actions';

export { ActionType };

export interface IAction {
  type: ActionType;
  overview?: AllCoursesOverviewResponse;
  courses?: Array<UICourse>;
  dateRange?: IDateRange;
  coursesSearchValue?: string;
  selectedRowKeys?: Array<Key>;
}

export interface IDispatch {
  (action: IAction): void;
}

export interface IState {
  isFetchingCoursesData: boolean;
  isFetchingCoursesDataError: boolean;
  dateRange: IDateRange;
  overview: AllCoursesOverviewResponse;
  courses: Array<UICourse>;
  filteredCourses: Array<UICourse>;
  coursesSearchValue: string;
  selectedRows: Array<UICourse>;
  selectedRowKeys: Array<Key>;
  isExportingCourses: boolean;
  isExportingCoursesError: boolean;
  isDeletingCourses: boolean;
  isDeletingCoursesError: boolean;
  isPublishingCourses: boolean;
  isPublishingCoursesError: boolean;
  isArchivingCourses: boolean;
  isArchivingCoursesError: boolean;
}

export interface ICoursesProvider {
  children: ReactNode;
}
