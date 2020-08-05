import { ReactNode } from 'react';

import { QuizOutlineUI } from '../../walkme/models/course/quiz';
import { Course } from '../../walkme/data/courseBuild';
import { CourseOverviewData } from '../../walkme/models';
import { CourseMetadata } from '../../walkme/data/courseMetadata';
import { IDateRange } from '../../utils';

import { ICourseOutlineItems } from '../../components/Screen/CourseScreen';
import { ActionType } from './actions';

export { ActionType };

export interface IAction {
  type: ActionType;
  overview?: CourseOverviewData;
  courseMetadata?: CourseMetadata;
  courseOutline?: ICourseOutlineItems;
  filteredCourseOutline?: ICourseOutlineItems;
  courseOutlineSearchValue?: string;
  quiz?: QuizOutlineUI;
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
  courseMetadata?: CourseMetadata;
  courseOutline: ICourseOutlineItems;
  filteredCourseOutline: ICourseOutlineItems;
  courseOutlineSearchValue: string;
  quiz: QuizOutlineUI;
  isExportingCourse: boolean;
  isExportingCourseError: boolean;
}

export interface ICourseProvider {
  children: ReactNode;
}
