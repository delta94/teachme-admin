import {
  WalkMeDataItem,
  ContentItem,
  WalkMeDataCollectionItem,
  TypeName,
  ResourceDataItem,
  TypeId,
  ResourceType,
} from '@walkme/types';
import { resolveLinks } from './collection';
import { getData } from './data';

export interface MapOptions {
  types?: Array<TypeName>;
}

const resolvers: { [key in TypeName]?: (item: WalkMeDataItem) => any } = {
  [TypeName.Content](item) {
    return {
      type:
        (<ResourceDataItem>item).Type == ResourceType.Article ? TypeName.Article : TypeName.Video,
    };
  },
};

export async function mapItem(
  item: WalkMeDataItem,
  type: TypeName,
  environmentId: number,
  options?: MapOptions
): Promise<ContentItem> {
  const customObj = resolvers[type]?.(item) || {};
  const childNodes = await getChildNodes(item as WalkMeDataCollectionItem, environmentId, options);
  return {
    id: item.Id,
    description: item.Description || '',
    properties: {},
    title: item.Name,
    type,
    childNodes: childNodes.filter<ContentItem | null>(isNotNull) as ContentItem[],
    ...customObj,
  };
}

function isNotNull<T>(item: T | null): item is null {
  return !!item;
}

export function getTypeNames(typeId: TypeId): Array<TypeName> {
  if ((typeId = TypeId.BusinessSolution)) {
    return [TypeName.SmartWalkThru, TypeName.SmartTipSet];
  }
  // @ts-ignore
  return [TypeName[TypeId[typeId]]];
}

async function getChildNodes(
  item: WalkMeDataCollectionItem,
  environmentId: number,
  options?: MapOptions
): Promise<Array<ContentItem | null>> {
  return item.LinkedDeployables ? resolveLinks(item.LinkedDeployables, environmentId, options) : [];
}

export const TYPE_IDS_TO_NAME: { [typeId: number]: TypeName } = (function () {
  let map: { [key: number]: TypeName } = {};
  for (const key in TypeId) {
    //@ts-ignore
    map[parseInt(TypeId[key])] = TypeName[key] as TypeName;
  }
  return map;
})();
