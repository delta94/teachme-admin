import { CourseItemType } from '../../../interfaces/course.interfaces';
import { QuizOutlineUI } from '../../../walkme/models/course/quiz';

export type ICourseOutlineItems = (ICourseOutlineItem | ICourseOutlineLesson)[];

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
  usersCompletedItem?: number | null;
  dropOff?: number;
}

export interface ICourseTabs {
  courseOutline: ICourseOutlineItems;
  quiz: QuizOutlineUI;
}

export interface ICourseOutlineTable {
  courseOutline: ICourseOutlineItems;
  filteredCourseOutline: ICourseOutlineItems;
  onSearchCourseOutline: (
    courseOutlineSearchValue: string,
    filteredCourseOutline: ICourseOutlineItems,
  ) => void;
  courseOutlineSearchValue: string;
}
