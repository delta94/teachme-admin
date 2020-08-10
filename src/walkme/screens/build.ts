import { WalkMeDataItem, ContentItem, TypeName } from '@walkme/types';
import { mapItem } from '../data/services/item';
import { Course } from '../data/courseBuild';
import * as courses from '../data/courseBuild';
import walkme from '@walkme/editor-sdk';
import * as wmData from '../data/services/wmData';
import consts from '../consts';
import * as segments from '../data/services/segments';
import { UISegment } from '../models';
/**
 * Returns a sorted list of folders with only smart WTs, articles and videos
 * @param environmentId
 */
export async function getItemsList(
  environmentId: number,
  refresh = false,
): Promise<Array<ContentItem>> {
  if (refresh) {
    wmData.refresh(consts.TEACHME_TYPES, environmentId);
  }
  const nestedItems: Array<WalkMeDataItem> = await walkme.data.getFolders(environmentId);
  const items = await Promise.all(
    nestedItems.map((item) =>
      mapItem(item, TypeName.Folder, environmentId, { types: consts.TEACHME_TYPES }),
    ),
  );
  return items.flat().reverse();
}

/**
 * Returns a sorted list of smart WTs, articles and videos without the wrapping folders
 * @param environmentId
 */
export async function getFlatItemsList(
  environmentId: number,
  refresh = false,
): Promise<Array<ContentItem>> {
  const nestedItems = await getItemsList(environmentId, refresh);
  return nestedItems.flatMap((item) => item.childNodes as ContentItem[]) as Array<ContentItem>;
}

/**
 * Returns a UI instance for a new course
 */
export async function getNewCourse(): Promise<Course> {
  return courses.getNewCourse();
}

/**
 *  Returns a UI instance for an existing course
 * @param id requested course id
 * @param environmentId requested environment id
 * @throws CourseNotFoundError if the course is not found in the users account
 */
export async function getCourse(id: number, environmentId: number): Promise<Course> {
  return courses.getCourse(id, environmentId);
}

/**
 * Returns a list of the account segments
 * @param environmentId the requested environment id
 */
export async function getSegments(environmentId: number): Promise<Array<UISegment>> {
  return segments.getSegments(environmentId);
}

