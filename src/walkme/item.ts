import {
  WalkMeDataItem,
  ContentItem,
  WalkMeDataCollectionItem,
  TypeName,
  TypeId,
  ResourceType,
  WalkMeLink,
  ResourceDataItem,
} from '@walkme/types';
import { resolveLinks, resolveLinksSync } from './collection';

export type PostMapper<T> = (item: ContentItem, original: WalkMeDataItem, link?: WalkMeLink) => T;
export interface MapOptions<T> {
  types?: Array<TypeName>;
  mapper?: PostMapper<T>;
  link?: WalkMeLink;
}

const idMapper: PostMapper<ContentItem> = (item, original, link) => item;

const resolvers: { [key in TypeName]?: (item: WalkMeDataItem) => any } = {
  [TypeName.Content](item) {
    return {
      type:
        (<ResourceDataItem>item).Type == ResourceType.Article ? TypeName.Article : TypeName.Video,
    };
  },
};

export async function mapItem<T extends ContentItem>(
  item: WalkMeDataItem,
  type: TypeName,
  environmentId: number,
  options?: MapOptions<T>,
): Promise<ContentItem> {
  const customObj = resolvers[type]?.(item) || {};
  const childNodes = await getChildNodes(item as WalkMeDataCollectionItem, environmentId, options);
  const postMapper = options?.mapper ?? idMapper;
  return postMapper(
    {
      id: item.Id,
      description: item.Description || '',
      properties: {},
      title: item.Name,
      type,
      childNodes: childNodes.filter<ContentItem | null>(isNotNull) as ContentItem[],
      ...customObj,
    },
    item,
    options?.link,
  );
}

export function mapItemSync<T extends ContentItem>(
  item: WalkMeDataItem,
  type: TypeName,
  environmentId: number,
  options?: MapOptions<T>,
): ContentItem {
  const customObj = resolvers[type]?.(item) || {};
  const childNodes = getChildNodesSync(item as WalkMeDataCollectionItem, environmentId, options);
  const postMapper = options?.mapper ?? idMapper;
  return postMapper(
    {
      id: item.Id,
      description: item.Description || '',
      properties: {},
      title: item.Name,
      type,
      childNodes: childNodes.filter<ContentItem | null>(isNotNull) as ContentItem[],
      ...customObj,
    },
    item,
    options?.link,
  );
}

function isNotNull<T>(item: T | null): item is null {
  return !!item;
}

async function getChildNodes<T extends ContentItem>(
  item: WalkMeDataCollectionItem,
  environmentId: number,
  options?: MapOptions<T>,
): Promise<Array<ContentItem | null>> {
  return item.LinkedDeployables ? resolveLinks(item.LinkedDeployables, environmentId, options) : [];
}

function getChildNodesSync<T extends ContentItem>(
  item: WalkMeDataCollectionItem,
  environmentId: number,
  options?: MapOptions<T>,
): Array<ContentItem | null> {
  return item.LinkedDeployables
    ? resolveLinksSync(item.LinkedDeployables, environmentId, options)
    : [];
}

export const TYPE_IDS_TO_NAME: { [typeId: number]: TypeName } = (function () {
  let map: { [key: number]: TypeName } = {};
  for (const key in TypeId) {
    //@ts-ignore
    map[parseInt(TypeId[key])] = TypeName[key] as TypeName;
  }
  return map;
})();

export function getTypeName(type: number) {
  switch (type) {
    case TypeId.Walkthru:
      return TypeName.Walkthru;
    case TypeId.Task:
      return TypeName.Task;
    case TypeId.Launcher:
      return TypeName.Launcher;
    case TypeId.Survey:
      return TypeName.Survey;
    case TypeId.Category:
      return TypeName.Category;
    case TypeId.Content:
      return TypeName.Content;
    case TypeId.Shuttle:
      return TypeName.Shuttle;
    case TypeId.Tag:
      return TypeName.Tag;
    case TypeId.ShoutOut:
      return TypeName.ShoutOut;
    case TypeId.BusinessSolution:
      return TypeName.SmartWalkThru;
    case TypeId.SmartTipSet:
      return TypeName.SmartTipSet;
    case TypeId.SmartWalkThru:
      return TypeName.SmartWalkThru;
    case TypeId.Lesson:
      return TypeName.Lesson;
    case TypeId.Course:
      return TypeName.Course;
    case TypeId.TrackedPage:
      return TypeName.TrackedPage;
    case TypeId.TrackedElement:
      return TypeName.TrackedElement;
    case TypeId.SearchProviderUrl:
      return TypeName.SearchProviderUrl;
    case TypeId.Folder:
      return TypeName.Folder;
    default:
      return TypeName.Unknown;
  }
}

export function getTypeId(type: string) {
  switch (type) {
    case TypeName.SmartTipSet:
      return TypeId.SmartTipSet;
    case TypeName.Video:
      return TypeId.Content;
    case TypeName.Article:
      return TypeId.Content;
    case TypeName.Content:
      return TypeId.Content;
    case TypeName.Launcher:
      return TypeId.Launcher;
    case TypeName.ShoutOut:
      return TypeId.ShoutOut;
    case TypeName.Shuttle:
      return TypeId.Shuttle;
    case TypeName.SmartWalkThru:
      return TypeId.SmartWalkThru;
    case TypeName.Survey:
      return TypeId.Survey;
    case TypeName.Task:
      return TypeId.Task;
    case TypeName.Course:
      return TypeId.Course;
    case TypeName.Lesson:
      return TypeId.Lesson;
    case TypeName.Walkthru:
      return TypeId.Walkthru;
    case TypeName.Category:
      return TypeId.Category;
    case TypeName.Tab:
      return TypeId.Collection;
    case TypeName.SearchProviderUrl:
      return TypeId.SearchProviderUrl;
    case TypeName.Tag:
      return TypeId.Tag;
    case TypeName.TrackedElement:
      return TypeId.TrackedElement;
    case TypeName.TrackedPage:
      return TypeId.TrackedPage;
    default:
      return TypeId.Unknown;
  }
}
