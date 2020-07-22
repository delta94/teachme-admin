import { CourseChild } from './courseBuild/courseItems';
import {
  CourseOutlineItem,
  CourseOutlineData,
  mapServerType,
  getCourseOutlineData,
} from '../analytics';
import { TypeName } from '@walkme/types';
import { getCourse } from './courseBuild';
import { CourseLesson } from './courseBuild/courseItems/lesson';
import { CourseTask } from './courseBuild/courseItems/task';

export type CourseOutlineUIModel = Array<CourseOutlineUIModelItem | CourseOutlineUIModelLesson>;

export enum CourseChildType {
  Lesson,
  Task,
}

export type CourseOutlineUIModelLesson = {
  type: CourseChildType.Lesson;
  items: CourseOutlineUIModelItem[];
};

export type CourseOutlineUIModelItem = {
  type: CourseChildType.Task;
  title: string;
  users_completed: number | null;
  drop_off: number;
};

function mapUIOutlineItem(
  item: CourseChild,
  itemData?: CourseOutlineItem,
): CourseOutlineUIModelItem {
  return {
    type: CourseChildType.Task,
    drop_off: 0,
    title: item.title,
    users_completed: itemData?.users_complete || null,
  };
}

function getCourseOutlineItem(
  type: TypeName,
  id: number,
  allData: CourseOutlineData,
): CourseOutlineItem | undefined {
  // need to do this in a more performant way
  return allData.find(function (item) {
    return mapServerType(item.item_type) == type && item.item_id == id;
  });
}

export async function getCourseOutline(
  courseId: number,
  environmentId: number,
  from: string,
  to: string,
): Promise<CourseOutlineUIModel> {
  const [course, outlineData] = await Promise.all([
    getCourse(courseId, environmentId),
    getCourseOutlineData(courseId, environmentId, from, to),
  ]);

  return course.items.toArray().map((item) => {
    return item.type == TypeName.Lesson
      ? {
          type: CourseChildType.Lesson,
          items: getLessonItems(<CourseLesson>item, outlineData),
        }
      : getTaskItem(<CourseTask>item, outlineData);
  });
}

function getTaskItem(item: CourseTask, outlineData: CourseOutlineData) {
  const outlineItem = getCourseOutlineItem(item.type as TypeName, item.id, outlineData);
  return mapUIOutlineItem(item, outlineItem);
}

function getLessonItems(
  lesson: CourseLesson,
  outlineData: CourseOutlineData,
): Array<CourseOutlineUIModelItem> {
  const items = lesson.childNodes.toArray().map((item) => getTaskItem(item, outlineData));
  return calculateDropOff(items);
}

function calculateDropOff(items: Array<CourseOutlineUIModelItem>): Array<CourseOutlineUIModelItem> {
  return items.map((item, index, array) => {
    if (index == 0) return item;
    const prev = array[index - 1].users_completed ?? 0;
    const curr = array[index].users_completed ?? 0;
    item.drop_off = (100 * curr) / prev;
    return item;
  });
}
