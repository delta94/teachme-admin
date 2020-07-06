import { WalkMeLink, ContentItem, WalkMeDataCollectionItem, CourseItem } from '@walkme/types';
import { getData } from './data';
import { TYPE_IDS_TO_NAME } from '@walkme/editor-sdk';
import { mapItem } from './item';

export async function resolveLinks(
  links: Array<WalkMeLink>,
  environmentId: number
): Promise<Array<ContentItem>> {
  return Promise.all(
    links.map(async link => {
      const [item] = await getData(TYPE_IDS_TO_NAME[link.DeployableType], environmentId, [
        link.DeployableID,
      ]);
      return mapItem(item, TYPE_IDS_TO_NAME[link.DeployableType], environmentId);
    })
  );
}
