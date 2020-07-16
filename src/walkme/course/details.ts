import {
  WalkMeDataCourse,
  BuildCourse,
  TypeName,
  WalkMeDataLesson,
  WalkMeDataEditedCourse,
} from '@walkme/types';
import { getData } from '../data';
import * as courseMap from './mappers/course';

export async function getCourseData(
  id: number,
  environmentId: number,
): Promise<BuildCourse | null> {
  const [course] = (await getData(TypeName.Course, environmentId, [id])) as Array<WalkMeDataCourse>;
  if (!course) return null;
  return courseMap.toUIModel(course, environmentId);
}

export function getCourseDataModel(
  course: BuildCourse,
  dataCourse: WalkMeDataCourse,
  dataLessons: Array<WalkMeDataLesson>,
): { course: WalkMeDataEditedCourse; lessons: Array<WalkMeDataLesson> } {
  return courseMap.toDataModel(course, dataCourse, dataLessons);
}
