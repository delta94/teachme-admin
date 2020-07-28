import * as data from '../data';
import { UICourse } from '../data';
import walkme from '@walkme/editor-sdk';
import { TypeName, TypeId } from '@walkme/types';
import { getAllCoursesOverview } from '../analytics';
import { AllCoursesOverviewResponse } from '../models';
import { getCourse } from '../data/courseBuild';
import { getData } from '../data/services/wmData';
import { saveAsCsv } from '../utils';
/**
 * Returns a list of courses data
 * @param environmentId the current selected environment id
 * @param from start date, format (YYYY-MM-DD)
 * @param to end date, format (YYYY-MM-DD)
 */
export async function getCourseList(
  environmentId: number,
  from: string,
  to: string,
): Promise<Array<UICourse>> {
  return data.getCourseList(environmentId, from, to);
}

/**
 * Publishes courses to a customer's environment
 * @param environmentId
 * @param coursesIds Array of course ids
 */
export async function publishCourses(environmentId: number, coursesIds: Array<number>) {
  await walkme.publish.publish(environmentId, TypeName.Course, TypeId.Course, coursesIds);
}

/**
 * Archive courses from a customer's environment
 * @param environmentId
 * @param coursesIds Array of course ids
 */
export async function archiveCourses(environmentId: number, coursesIds: Array<number>) {
  await walkme.publish.archive(environmentId, TypeName.Course, TypeId.Course, coursesIds);
}

/**
 * Delete courses from customer account
 * @param environmentId
 * @param coursesIds Array of course ids
 */
export async function deleteCourse(courseId: number) {
  const [course] = await getData(TypeName.Course, 0, [courseId]);
  return await walkme.data.deleteItem(TypeName.Course, TypeId.Course, courseId, course.ResourceId);
}

/**
 * Downloads the courses table as csv
 * @param environmentId requested environment id
 * @param from start date in format YYYY-MM-DD
 * @param to end date in format YYYY-MM-DD
 * @returns a promise that is resolved once the file is downloaded
 */
export async function exportCoursesData(
  environmentId: number,
  from: string,
  to: string,
): Promise<void> {
  const courses = await getCourseList(environmentId, from, to);
  return saveAsCsv(
    courses,
    [
      'id',
      'title',
      'publishStatus',
      'segments',
      'users_started',
      'users_completed',
      'avg_quiz_score',
      'avg_quiz_attempts',
      'quiz_passed',
    ],
    `teachme-courses-data-${Date.now()}`,
  );
}

export async function changeIndex(courseId: number, fromIndex: number, toIndex: number) {
  return await walkme.data.reorder(courseId, TypeId.Course, fromIndex, toIndex);
}
/**
 * Returns data for the top 3 panel in the courses overview screen
 * @param environment requested environment id
 * @param from start date, format (YYYY-MM-DD)
 * @param to end date, format (YYYY-MM-DD)
 */
export function getCoursesOverview(
  environment: number,
  from: string,
  to: string,
): Promise<AllCoursesOverviewResponse> {
  return getAllCoursesOverview(environment, from, to);
}
