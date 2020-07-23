import { TypeName } from '@walkme/types';

/**
 * Course outline is an array of lessons or items
 */
export type CourseOutlineUIModel = Array<CourseOutlineUIModelItem | CourseOutlineUIModelLesson>;

/**
 * Determines the type of the item in the outline array
 */
export enum CourseChildType {
  Lesson,
  Task,
}

/**
 * Lesson item in the outline array
 */
export type CourseOutlineUIModelLesson = {
  /** Lesson type indication */
  childType: CourseChildType.Lesson;
  /** Array of child tasks */
  items: CourseOutlineUIModelItem[];
  /** Lesson id */
  id: number;
  /** Lesson title */
  title: string;
};

export type CourseOutlineUIModelItem = {
  /** Task type indication */
  childType: CourseChildType.Task;
  /** Task title */
  title: string;
  /** Number of users who completed or null if no data exists */
  users_completed: number | null;
  /** Percentage of users who completed this task out of users who completed the previous one */
  drop_off: number;
  /** Task type (article, video or smartwalkthru) */
  type: TypeName;
  /** Task id */
  id: number;
};
