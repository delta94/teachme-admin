import { TYPE_NAMES } from '@walkme/editor-sdk';
import {
  WalkMeDataCourse,
  Course,
  CourseItem,
  WalkMeDataQuiz,
  Quiz,
  BuildCourse,
} from '@walkme/types';
import { getData } from '../data';
import { mapItem } from '../item';

export async function getCourseData(
  id: number,
  environmentId: number
): Promise<BuildCourse | null> {
  const [course] = (await getData(TYPE_NAMES.COURSE, environmentId, [id])) as Array<
    WalkMeDataCourse
  >;
  if (!course) return null;
  return mapToFullCourse(course, environmentId);
}

export async function mapToFullCourse(
  course: WalkMeDataCourse,
  environmentId: number
): Promise<BuildCourse> {
  const courseItem = await mapItem(course, TYPE_NAMES.COURSE, environmentId);
  return {
    id: courseItem.id as number,
    title: courseItem.title,
    items: courseItem.childNodes as CourseItem[],
    quiz: course.Quiz,
  };
}
