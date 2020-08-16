import { ReactNode } from 'react';

import { QuizOutlineUI } from '../../walkme/models/course/quiz';
import { CourseOverviewData } from '../../walkme/models';
import { CourseMetadata } from '../../walkme/data/courseMetadata';

import { ICourseOutlineItems, ICourseOutline } from '../../components/Screen/CourseScreen';
import { ActionType } from './actions';

export { ActionType };

export interface IAction {
  type: ActionType;
  overview?: CourseOverviewData;
  courseMetadata?: CourseMetadata;
  courseOutline?: ICourseOutline;
  filteredCourseOutline?: ICourseOutlineItems;
  courseOutlineSearchValue?: string;
  quiz?: QuizOutlineUI;
}

export interface IDispatch {
  (action: IAction): void;
}

export interface IState {
  isFetchingCourseData: boolean;
  isFetchingCourseDataError: boolean;
  overview: CourseOverviewData;
  courseMetadata?: CourseMetadata;
  courseOutline: ICourseOutline;
  filteredCourseOutline: ICourseOutlineItems;
  courseOutlineSearchValue: string;
  quiz: QuizOutlineUI;
  isExportingCourse: boolean;
  isExportingCourseError: boolean;
}

export interface ICourseProvider {
  children: ReactNode;
}
