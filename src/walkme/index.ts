import walkme from '@walkme/editor-sdk';
import { TypeName, ContentItem, TypeId, WalkMeDataItem, WalkMeDataNewCourse } from '@walkme/types';

import { UICourse } from './data/courseList';
import { mapItem } from './item';
import * as data from './data';
import * as courses from './data/courseBuild';
import { getCourseListData } from './analytics';
import { Course } from './data/courseBuild';
import { CourseOutlineUIModel } from './data';
import { getUIQuiz, QuizOutlineUI } from './data/quizOutline';

declare global {
  interface Window {
    walkme: any;
    test: any;
  }
}
// For debug purposes
window.walkme = walkme;

export function getRedirectURI(): string {
  switch (window.location.hostname) {
    case 'localhost':
      return 'http://localhost:7000/#&';
    case 'teachme.walkme.com':
      return 'http://teachme.walkme.com/#&';
    case 'cdn.walkme.com':
      return 'https://cdn.walkme.com/apps/teachme-admin/index.html#&';
    default:
      return window.location.href;
  }
}

/**
 * Returns a list of courses data
 * @param environmentId the current selected environment id
 * @param from date, format (YYYY-MM-DD)
 * @param to date, format (YYYY-MM-DD)
 */
export async function getCourseList(
  environmentId: number,
  from: string,
  to: string,
): Promise<Array<UICourse>> {
  return data.getCourseList(environmentId, from, to);
}

export async function getCourseOutline(
  courseId: number,
  environmentId: number,
  from: string,
  to: string,
): Promise<CourseOutlineUIModel> {
  return data.getCourseOutline(courseId, environmentId, from, to);
}

export async function getQuizData(
  course_id: number,
  environment: number,
  from: string,
  to: string,
): Promise<QuizOutlineUI | undefined> {
  return getUIQuiz(course_id, environment, from, to);
}
/**
 * Returns a sorted list of folders with only smart WTs, articles and videos
 * @param environmentId
 */
export async function getItemsList(environmentId: number): Promise<Array<ContentItem>> {
  const nestedItems: Array<WalkMeDataItem> = await walkme.data.getFolders(environmentId);
  const items = await Promise.all(
    nestedItems.map((item) =>
      mapItem(item, TypeName.Folder, environmentId, {
        types: [TypeName.SmartWalkThru, TypeName.Content],
      }),
    ),
  );
  return items.flat().reverse();
}

/**
 * Returns a sorted list of smart WTs, articles and videos without the wrapping folders
 * @param environmentId
 */
export async function getFlatItemsList(environmentId: number): Promise<Array<ContentItem>> {
  const nestedItems = await getItemsList(environmentId);
  return nestedItems.flatMap((item) => item.childNodes as ContentItem[]) as Array<ContentItem>;
}

/**
 * Returns Data for logged-in user
 */
export async function getUserData() {
  return walkme.user.getUserData();
}

export async function getEnvironments() {
  return walkme.environment.getEnvironments();
}

export async function getSystems() {
  return walkme.system.getSystems();
}

export async function getSystemData() {
  return walkme.system.getSystemData();
}

export async function switchSystem(id: number) {
  return walkme.system.switchSystem(id);
}

export async function getNewCourse(): Promise<Course> {
  return courses.getNewCourse();
}

export async function getCourse(id: number, environmentId: number): Promise<Course> {
  return courses.getCourse(id, environmentId);
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
 * Logs the user out and redirects to the url configured in walkme.auth.init call
 */
export function logout() {
  walkme.auth.logout();
}

export async function authInit(params: {
  client_id: any;
  redirect_uri: any;
  post_logout_redirect_uri: any;
}): Promise<void> {
  walkme.auth.onTokenExpired(() => {
    console.log('Token expired - redirecting to login');
    walkme.auth.init(params);
  });
  await walkme.auth.init(params);
}

export * from '@walkme/editor-sdk';

window.test = {
  getCourseList,
  getCourse,
  getItemsList,
  getFlatItemsList,
  getUserData,
  getEnvironments,
  getSystems,
  // saveCourse,
  getNewCourse,
  publishCourses,
  getCourseListData,
  getCourseOutline,
  getQuizData,
  // for debug
  // getCourseDataModel: courses.getCourseDataModel,
};
