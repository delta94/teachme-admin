import {
  WalkMeDataCourseItem,
  WalkMeDataEditedCourse,
  BuildCourseTask,
  WalkMeDataItem,
  ContentItem,
  TypeName,
  WalkMeDataCourseNewItem,
  WalkMeDataCourseTask,
  WalkMeLink,
  CourseTaskCompletionType,
  WalkMeDataCourseTaskSettings,
  WalkMeDataLesson,
} from '@walkme/types';
import { resolveLinks, createLink } from '../../../collection';
import * as lessonMap from './lesson';
import * as itemMap from './item';
import { notEmpty } from '../../../utils';

export async function toUIModel(
  items: Array<WalkMeDataCourseItem>,
): Promise<Array<BuildCourseTask>> {
  const courseItems = await resolveLinks(items, 0, {
    mapper: itemMapper,
  });
  return courseItems.filter(notEmpty);
}

function itemMapper(
  item: ContentItem,
  original: WalkMeDataItem,
  link?: WalkMeLink,
): BuildCourseTask {
  return item.type == TypeName.Lesson ? item : mapItem(item, original, link);
}

function mapItem(
  item: BuildCourseTask,
  original: WalkMeDataItem,
  link?: WalkMeDataCourseTask,
): BuildCourseTask {
  return {
    ...item,
    properties: {
      completionType: link?.Settings.cmplType ?? CourseTaskCompletionType.Completed,
    },
  };
}

export function toDataModel(
  items: Array<BuildCourseTask>,
  dataLessons: Array<WalkMeDataLesson>,
): { courseItems: Array<WalkMeDataCourseNewItem>; lessons: Array<WalkMeDataLesson> } {
  const courseItems: Array<WalkMeDataCourseNewItem> = [];
  const lessons: Array<WalkMeDataLesson> = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.type == TypeName.Lesson) {
      const lesson = dataLessons.find((lesson) => lesson.Id == item.id);
      if (!lesson) throw new Error("Can't map to non-existing  lesson");

      lessons.push(lessonMap.toDataModel(item, lesson, i));
    }
    courseItems.push(itemMap.toDataModel(item, i));
  }
  return { courseItems, lessons };
}
