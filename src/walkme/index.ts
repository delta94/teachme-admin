import walkme from '@walkme/editor-sdk';
import { UICourse, mapCourse } from './course/overview';
import { WalkMeDataCourse, TypeName, Course, BuildCourse, ContentItem } from '@walkme/types';
import * as courses from './course/details';
import { mapItem } from './item';

declare global {
  interface Window {
    walkme: any;
    test: any;
  }
}
// For debug purposes
window.walkme = walkme;

/**
 * Returns a list of courses metadata
 * @param environmentId the current selected environment id
 */
export async function getCourseList(environmentId: number): Promise<Array<UICourse | null>> {
  const courses = (await walkme.data.getContent(
    TypeName.Course,
    environmentId
  )) as WalkMeDataCourse[];
  const uiCourses = await Promise.all(
    courses.map(course => {
      try {
        return mapCourse(course, environmentId);
      } catch (err) {
        walkme.error(err);
        return null;
      }
    })
  );

  return uiCourses.filter(Boolean);
}

export async function getCourse(id: number, environmentId: number): Promise<BuildCourse | null> {
  return courses.getCourseData(id, environmentId);
}

export async function getItemsList(environmentId: number): Promise<Array<ContentItem>> {
  const nestedItems = await walkme.data.getFolders(environmentId);
  const items = await Promise.all(
    nestedItems.map(item =>
      mapItem(item, TypeName.Folder, environmentId, {
        types: [TypeName.SmartWalkThru, TypeName.Article, TypeName.Video],
      })
    )
  );
  return items.flat().reverse();
}

export async function getFlatItemsList(environmentId: number): Promise<Array<ContentItem>> {
  const nestedItems = await getItemsList(environmentId);
  return nestedItems.flatMap(item => item.childNodes) as Array<ContentItem>;
}

export async function getUserData() {}

export async function getEnvironments() {}

export async function getSystems() {}

export * from '@walkme/editor-sdk';

window.test = { getCourseList, getCourse, getItemsList, getFlatItemsList };
