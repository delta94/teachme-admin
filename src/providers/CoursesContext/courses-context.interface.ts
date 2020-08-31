import { ReactNode } from 'react';

import { AllCoursesOverviewResponse } from '../../walkme/models/overview';
import { UICourse } from '../../walkme/data';

import { ActionType } from './actions';

export { ActionType };

export interface IAction {
  type: ActionType;
  overview?: AllCoursesOverviewResponse;
  courses?: Array<UICourse>;
  coursesSearchValue?: string;
  selectedRowIds?: Array<number>;
}

export interface IDispatch {
  (action: IAction): void;
}

export interface IState {
  isFetchingCoursesData: boolean;
  isFetchingCoursesDataError: boolean;
  overview: AllCoursesOverviewResponse;
  courses: Array<UICourse>;
  filteredCourses: Array<UICourse>;
  coursesSearchValue: string;
  selectedRows: Array<UICourse>;
  selectedRowIds: Array<number>;
  isSortingCourses: boolean;
  isSortingCoursesError: boolean;
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
