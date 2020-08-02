import { QuizOutlineUI } from '../../../walkme/models/course/quiz';
import { ICourseOutlineItem } from './utils';

// TODO: create a properly interface instead of using any
export interface ICourseTabs {
  // course: any;
  courseOutline: ICourseOutlineItem[];
  quiz: QuizOutlineUI;
}

// TODO: create a properly interface instead of using any
export interface ICourseOutlineTable {
  courseOutline: ICourseOutlineItem[];
}
