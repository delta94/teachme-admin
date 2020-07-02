import walkme from '@walkme/editor-sdk';
import { UICourse, mapCourse } from './course';
import { WalkMeDataCourse } from '@walkme/types';

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
  const courses: Array<WalkMeDataCourse> = await walkme.data.getContent(
    walkme.data.TYPE_NAMES.COURSE,
    environmentId
  );
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

export async function getCourse() {}

export async function getItemsList() {}

export async function getUserData() {}

export async function getEnvironments() {}

export async function getSystems() {}

export * from '@walkme/editor-sdk';

window.test = { getCourseList };
