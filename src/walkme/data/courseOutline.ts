import { CourseChild } from './courseBuild/courseItems';
import {
  CourseOutlineItem,
  CourseOutlineData,
  getCourseOutlineData,
  matchesServerType,
} from '../analytics';
import { TypeName } from '@walkme/types';
import { getCourse } from './courseBuild';
import { CourseLesson } from './courseBuild/courseItems/lesson';
import { CourseTask } from './courseBuild/courseItems/task';
import {
  CourseOutlineUIModelItem,
  CourseChildType,
  CourseOutlineUIModel,
  CourseOutlineUIModelLesson,
} from '../models/course/outline';

function mapUIOutlineItem(
  item: CourseChild,
  itemData?: CourseOutlineItem,
): CourseOutlineUIModelItem {
  return {
    childType: CourseChildType.Task,
    drop_off: 0,
    title: item.title,
    users_completed: itemData?.users_complete || null,
    id: item.id,
    type: item.type as TypeName,
  };
}

function getCourseOutlineItem(
  type: TypeName,
  id: number,
  allData: CourseOutlineData,
): CourseOutlineItem | undefined {
  // need to do this in a more performant way
  return allData.find(function (item) {
    return matchesServerType(type, item.item_type) && item.item_id == id;
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
      ? getLesson(<CourseLesson>item, outlineData)
      : getTaskItem(<CourseTask>item, outlineData);
  });
}

function getTaskItem(item: CourseTask, outlineData: CourseOutlineData) {
  const outlineItem = getCourseOutlineItem(item.type as TypeName, item.id, outlineData);
  return mapUIOutlineItem(item, outlineItem);
}

function getLesson(
  lesson: CourseLesson,
  outlineData: CourseOutlineData,
): CourseOutlineUIModelLesson {
  const items = lesson.childNodes.toArray().map((item) => getTaskItem(item, outlineData));
  return {
    childType: CourseChildType.Lesson,
    items: calculateDropOff(items),
    id: lesson.id,
    title: lesson.title,
  };
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
