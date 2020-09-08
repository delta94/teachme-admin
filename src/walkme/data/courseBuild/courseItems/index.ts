import {
  WalkMeDataNewLesson,
  NewCourseLessonData,
  WalkMeDataNewCourseTask,
  NewCourseItemData,
  WalkMeDataCourseNewItem,
  TypeId,
} from '@walkme/types';
import { CourseLesson, newDataModel as getNewLesson } from './lesson';
import { CourseTask, newDataModel as getNewItem } from './task';
import { Container, DeployableContainer } from '../itemsContainer';
import * as wmData from '../../services/wmData';

function isLessonLink(link: WalkMeDataCourseNewItem) {
  return link.DeployableType == TypeId.Lesson;
}

function isLessonData<TValue>(value: TValue): value is TValue {
  return !value || !(value as any).type;
}

export function isLesson(value: CourseChild | CourseChildData): value is CourseLesson {
  return (value as any).LinkedDeployables != null;
}

export const getCourseChildren = (links: WalkMeDataCourseNewItem[]): CourseChildContainer => {
  const children = links.map((item) => {
    if (!isLessonLink(item)) return item;

    return (wmData.getDataSync(TypeId.Lesson, [
      item.DeployableID,
    ])[0] as unknown) as WalkMeDataNewLesson;
  });
  return new DeployableContainer(children, getCourseChildItem, getNewCourseItem);
};

function getCourseChildItem(data: CourseChildData): CourseChild {
  if (isLesson(data)) {
    return new CourseLesson(data as WalkMeDataNewLesson);
  }
  return new CourseTask(data as WalkMeDataNewCourseTask);
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
export type CourseChildContainer = DeployableContainer<
  CourseChild,
  CourseChildNewItemData,
  CourseChildData
>;
