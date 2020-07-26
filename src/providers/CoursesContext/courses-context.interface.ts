import { ReactNode } from 'react';

import { UICourse } from '../../walkme/data';

import { ActionType } from './actions';

export { ActionType };

export interface IAction {
  type: ActionType;
  courses?: Array<UICourse> | null;
  coursesSearchValue?: string;
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
}

export interface ICoursesProvider {
  children: ReactNode;
}
