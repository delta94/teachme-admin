import { CourseItemType } from '../../../interfaces/course.interfaces';
import { QuizOutlineUI } from '../../../walkme/models/course/quiz';

export interface ICourseOutlineLesson {
  children?: ICourseOutlineItem[];
}

export interface ICourseOutlineItem extends ICourseOutlineLesson {
  key: number;
  title: string;
  type: CourseItemType;
  itemName: {
    value: string;
    icon?: CourseItemType;
  };
  className: string;
  usersCompletedItem?: number;
  dropOff?: number;
}

export interface ICourseTabs {
  courseOutline: ICourseOutlineItem[];
  quiz: QuizOutlineUI;
}

export interface ICourseOutlineTable {
  courseOutline: ICourseOutlineItem[];
}
