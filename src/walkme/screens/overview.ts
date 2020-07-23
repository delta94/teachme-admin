import * as data from '../data';
import { UICourse } from '../data';
import walkme from '@walkme/editor-sdk';
import { TypeName, TypeId } from '@walkme/types';
import { getAllCoursesOverview } from '../analytics';
import { AllCoursesOverviewResponse } from '../models';
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
