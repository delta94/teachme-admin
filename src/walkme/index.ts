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
import { mapItem, getTypeId } from './item';
import { getData } from './data';
import { notEmpty, index } from './utils';
import { Course } from './course/mappers/course';
import {
  getCourseListData,
  getCourseOutlineData,
  CourseOutlineData,
  CourseOutlineItem,
} from './analytics';
import { join } from './utils';
import { CourseTask } from './course/mappers/course/courseItems/task';
import { CourseChild } from './course/mappers/course/courseItems';
import { CourseLesson } from './course/mappers/course/courseItems/lesson';

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
  const [coursesMetadata, coursesData] = await Promise.all([
    walkme.data.getContent(TypeName.Course, environmentId),
    getCourseListData(environmentId, from, to),
  ]);
  const mergedData = join(coursesMetadata as WalkMeDataCourse[], coursesData, 'Id', 'course_id');
  const uiCourses = await Promise.all(
    mergedData.map((course) => {
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

export type CourseOutlineUIModel = Array<CourseOutlineUIModelItem | CourseOutlineUIModelLesson>;

export enum CourseChildType {
  Lesson,
  Task,
}

export type CourseOutlineUIModelLesson = {
  type: CourseChildType.Lesson;
  items: CourseOutlineUIModelItem[];
};

export type CourseOutlineUIModelItem = {
  type: CourseChildType.Task;
  title: string;
  users_completed: number | null;
  drop_off: number;
};

function mapUIOutlineItem(
  item: CourseChild,
  itemData?: CourseOutlineItem,
): CourseOutlineUIModelItem {
  return {
    type: CourseChildType.Task,
    drop_off: 0,
    title: item.title,
    users_completed: itemData?.users_completed || null,
  };
}

function getCourseOutlineItem(
  type: TypeName,
  id: number,
  allData: CourseOutlineData,
): CourseOutlineItem | undefined {
  // need to do this in a more performant way
  return allData.find((item) => item.type == getTypeId(type) && item.id == id);
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
      ? {
          type: CourseChildType.Lesson,
          items: (<CourseLesson>item).childNodes
            .toArray()
            .map((item) =>
              mapUIOutlineItem(
                item,
                getCourseOutlineItem(item.type as TypeName, item.id, outlineData),
              ),
            ),
        }
      : mapUIOutlineItem(item, getCourseOutlineItem(item.type as TypeName, item.id, outlineData));
  });
}

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
  // for debug
  // getCourseDataModel: courses.getCourseDataModel,
};
