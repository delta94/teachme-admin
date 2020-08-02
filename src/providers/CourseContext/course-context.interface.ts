import { ReactNode } from 'react';

import { QuizOutlineUI } from '../../walkme/models/course/quiz';
import { Course } from '../../walkme/data/courseBuild';
import { CourseOverviewData } from '../../walkme/models';
import { IDateRange } from '../../utils';

import { ICourseOutlineItems } from '../../components/Screen/CourseScreen';
import { ActionType } from './actions';

export { ActionType };

export interface IAction {
  type: ActionType;
  overview?: CourseOverviewData;
  course?: Course;
  courseOutline?: ICourseOutlineItems;
  quiz?: QuizOutlineUI;
  dateRange?: IDateRange;
  courseOutlineSearchValue?: string;
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
  courseOutline: ICourseOutlineItems;
  quiz: QuizOutlineUI;
  isExportingCourse: boolean;
  isExportingCourseError: boolean;
  courseOutlineSearchValue: string;
}

export interface ICourseProvider {
  children: ReactNode;
}
