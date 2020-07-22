import { WalkMeDataItem, ContentItem, TypeName } from '@walkme/types';
import { mapItem } from '../data/services/item';
import { Course } from '../data/courseBuild';
import * as courses from '../data/courseBuild';
import walkme from '@walkme/editor-sdk';

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
 * Returns a UI instance for a new course
 */
export async function getNewCourse(): Promise<Course> {
  return courses.getNewCourse();
}

/**
 *  Returns a UI instance for an existing course
 * @param id requested course id
 * @param environmentId requested environment id
 */
export async function getCourse(id: number, environmentId: number): Promise<Course> {
  return courses.getCourse(id, environmentId);
}