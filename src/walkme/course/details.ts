import {
  WalkMeDataCourse,
  Course,
  CourseItem,
  WalkMeDataQuiz,
  Quiz,
  BuildCourse,
  TypeName,
} from '@walkme/types';
import { getData } from '../data';
import { mapItem } from '../item';

export async function getCourseData(
  id: number,
  environmentId: number,
): Promise<BuildCourse | null> {
  const [course] = (await getData(TypeName.Course, environmentId, [id])) as Array<WalkMeDataCourse>;
  if (!course) return null;
  return mapToFullCourse(course, environmentId);
}

export async function mapToFullCourse(
  course: WalkMeDataCourse,
  environmentId: number,
): Promise<BuildCourse> {
  const courseItem = await mapItem(course, TypeName.Course, environmentId);
  return {
    id: courseItem.id as number,
    title: courseItem.title,
    items: courseItem.childNodes as CourseItem[],
    quiz: {
      failScreen: course.Quiz.FailSummeryPage,
      successScreen: course.Quiz.SuccessSummeryPage,
      id: course.Quiz.Id,
      properties: {
        forceCourseCompletion: course.Quiz.Settings.isLimited,
        passmark: course.
      }
    },
  };
}
