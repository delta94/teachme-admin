import { WalkMeDataItem, ContentItem, WalkMeDataCollectionItem } from '@walkme/types';
import { TYPE_NAMES } from '@walkme/editor-sdk';
import { resolveLinks } from './collection';

export async function mapItem(
  item: WalkMeDataItem,
  type: TYPE_NAMES,
  environmentId: number
): Promise<ContentItem> {
  // const { properties } = resolvers[collection.GroupType].resolve(collection);
  return {
    id: item.Id,
    description: item.Description || '',
    properties: {},
    title: item.Name,
    type,
    childNodes: await getChildNodes(item as WalkMeDataCollectionItem, environmentId),
  };
}

async function getChildNodes(
  item: WalkMeDataCollectionItem,
  environmentId: number
): Promise<Array<ContentItem>> {
  return item.LinkedDeployables ? resolveLinks(item.LinkedDeployables, environmentId) : [];
}
