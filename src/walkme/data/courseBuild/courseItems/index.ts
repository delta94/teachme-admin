import {
  WalkMeDataNewLesson,
  NewCourseLessonData,
  WalkMeDataNewCourseTask,
  NewCourseItemData,
} from '@walkme/types';
import { CourseLesson, newDataModel as getNewLesson } from './lesson';
import { CourseTask, newDataModel as getNewItem } from './task';
import { Container } from '../itemsContainer';

function isLessonData<TValue>(value: TValue): value is TValue {
  return !value || !(value as any).type;
}

export function isLesson<TValue>(value: TValue): value is TValue {
  return (value as any).LinkedDeployables != null;
}

export const getCourseChildren = (data: Array<CourseChildData>): CourseChildContainer =>
  new Container(data, getCourseChildItem, getNewCourseItem);

function getCourseChildItem(data: CourseChildData): CourseChild {
  if (isLesson(data)) {
    return new CourseLesson(data as WalkMeDataNewLesson);
  }
  return new CourseTask(data);
}

function getNewCourseItem(index: number, newItemData?: CourseChildNewItemData): CourseChildData {
  if (isLessonData(newItemData)) {
    return getNewLesson(index, newItemData as NewCourseLessonData);
  }
  return getNewItem(index, newItemData);
}

export type CourseChild = CourseLesson | CourseTask;
export type CourseChildData = WalkMeDataNewLesson | WalkMeDataNewCourseTask;
export type CourseChildNewItemData = NewCourseLessonData | NewCourseItemData;
export type CourseChildContainer = Container<CourseChild, CourseChildNewItemData, CourseChildData>;
