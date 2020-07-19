import {
  WalkMeDataCourse,
  BuildCourse,
  TypeName,
  WalkMeDataLesson,
  WalkMeDataEditedCourse,
  WalkMeDataNewCourse,
  WalkMeDataNewLesson,
} from '@walkme/types';
import { getData } from '../data';
import * as courseMap from './mappers/course';
import { getNewCourse } from './new';

export async function getCourseData(
  id: number,
  environmentId: number,
): Promise<BuildCourse | null> {
  const [course] = (await getData(TypeName.Course, environmentId, [id])) as Array<WalkMeDataCourse>;
  if (!course) return null;
  return courseMap.toUIModel(course, environmentId);
}

export async function getCourseDataModel(
  course: BuildCourse,
): Promise<{
  course: WalkMeDataEditedCourse | WalkMeDataNewCourse;
  lessons: Array<WalkMeDataNewLesson>;
}> {
  if (course.id < 0) {
    return courseMap.toDataModel(course, getNewCourse(course.index), []);
  }

  const courseData = (await getData(TypeName.Course, 0, [course.id])) as Array<WalkMeDataCourse>;
  const lessons = ((await getData(
    TypeName.Lesson,
    0,
    course.items.filter((i) => i.type == TypeName.Lesson).map((i) => i.id as number),
  )) as unknown) as Array<WalkMeDataNewLesson>;
  return courseMap.toDataModel(course, courseData[0], lessons);
}
