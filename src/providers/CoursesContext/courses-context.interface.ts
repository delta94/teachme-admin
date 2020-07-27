import { ReactNode, Key } from 'react';

import { UICourse } from '../../walkme/data';

import { ActionType } from './actions';

export { ActionType };

export interface IAction {
  type: ActionType;
  courses?: Array<UICourse>;
  coursesSearchValue?: string;
  selectedRowKeys?: Array<Key>;
}

export interface IDispatch {
  (action: IAction): void;
}

export interface IState {
  isFetchingCourses: boolean;
  isFetchingCoursesError: boolean;
  courses: Array<UICourse>;
  filteredCourses: Array<UICourse>;
  coursesSearchValue: string;
  selectedRows: Array<UICourse>;
  selectedRowKeys: Array<Key>;
  isExportingCourses: boolean;
  isExportingCoursesError: boolean;
  isDeletingCourses: boolean;
  isDeletingCoursesError: boolean;
}

export interface ICoursesProvider {
  children: ReactNode;
}
