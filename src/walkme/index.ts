import walkme from '@walkme/editor-sdk';
import { UserData } from '@walkme/editor-sdk/dist/user';
import {
  WalkMeDataCourse,
  TypeName,
  BuildCourse,
  ContentItem,
  TypeId,
  WalkMeDataLesson,
  WalkMeDataItem,
  WalkMeDataNewLesson,
  WalkMeDataNewCourse,
} from '@walkme/types';
import { WalkMeEnvironment } from '@walkme/editor-sdk/dist/environment';
import { SystemData } from '@walkme/editor-sdk/dist/system';

import { UICourse, mapCourse } from './course/overview';
import * as courses from './course/defaults';
import { mapItem } from './item';
import { getData } from './data';
import { notEmpty } from './utils';
import { Course } from './course/mappers/course';

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
 * Returns a list of courses metadata
 * @param environmentId the current selected environment id
 */
export async function getCourseList(environmentId: number): Promise<Array<UICourse>> {
  const courses = (await walkme.data.getContent(
    TypeName.Course,
    environmentId,
  )) as WalkMeDataCourse[];
  const uiCourses = await Promise.all(
    courses.map((course) => {
      try {
        return mapCourse(course, environmentId);
      } catch (err) {
        walkme.error(err);
        return null;
      }
    }),
  );

  return uiCourses.filter(notEmpty);
}

// /**
//  * Returns a UI model for the given course id or null if it does not exist
//  * @param id
//  * @param environmentId
//  */
// export async function getCourse(id: number, environmentId: number): Promise<BuildCourse | null> {
//   return courses.getCourseData(id, environmentId);
// }

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

// /**
//  * Saves the course to the server
//  * @param course
//  */
// export async function saveCourse(course: BuildCourse) {
//   const courseToSave = await courses.getCourseDataModel(course);
//   const lessons: Array<WalkMeDataLesson> = await walkme.data.saveContent(
//     TypeName.Lesson,
//     courseToSave.lessons,
//     TypeId.Lesson,
//   );
//   courseToSave.course.LinkedDeployables.filter(
//     (item) => item.DeployableType == TypeId.Lesson,
//   ).forEach((item) => {
//     item.DeployableID = lessons[item.DeployableID].Id;
//   });
//   return walkme.data.saveContent(TypeName.Course, courseToSave.course, TypeId.Course);
// }

async function initData(environmentId: number) {
  await Promise.all(
    [TypeName.Course, TypeName.Lesson, TypeName.Article, TypeName.SmartWalkThru].map((type) =>
      getData(type, environmentId),
    ),
  );
}

export async function getNewCourse(): Promise<Course> {
  await initData(0);
  return new Course();
}

export async function getCourse(id: number, environmentId: number): Promise<Course> {
  await initData(environmentId);

  const [course] = ((await getData(TypeName.Course, environmentId, [id])) as unknown) as Array<
    WalkMeDataNewCourse
  >;
  return new Course(course);
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
  // for debug
  // getCourseDataModel: courses.getCourseDataModel,
};
