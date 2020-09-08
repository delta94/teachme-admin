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

export function getResourceType(type: ResourceType): TypeName {
  switch (type) {
    case ResourceType.Article:
      return TypeName.Article;
    case ResourceType.Video:
      return TypeName.Video;
  }
}

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
    case -TypeId.Content:
      return TypeName.Video;
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

const typeToTypId = {
  [TypeName.SmartTipSet]: TypeId.SmartTipSet,
  [TypeName.Video]: -TypeId.Content,
  [TypeName.Article]: TypeId.Content,
  [TypeName.Content]: TypeId.Content,
  [TypeName.Launcher]: TypeId.Launcher,
  [TypeName.ShoutOut]: TypeId.ShoutOut,
  [TypeName.Shuttle]: TypeId.Shuttle,
  [TypeName.SmartWalkThru]: TypeId.SmartWalkThru,
  [TypeName.Survey]: TypeId.Survey,
  [TypeName.Task]: TypeId.Task,
  [TypeName.Course]: TypeId.Course,
  [TypeName.Lesson]: TypeId.Lesson,
  [TypeName.Walkthru]: TypeId.Walkthru,
  [TypeName.Category]: TypeId.Category,
  [TypeName.Tab]: TypeId.Collection,
  [TypeName.SearchProviderUrl]: TypeId.SearchProviderUrl,
  [TypeName.Tag]: TypeId.Tag,
  [TypeName.TrackedElement]: TypeId.TrackedElement,
  [TypeName.TrackedPage]: TypeId.TrackedPage,
};

export function getTypeId(type: string) {
  //@ts-ignore
  return typeToTypId[type] ?? TypeId.Unknown;
}
