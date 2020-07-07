import {
  WalkMeDataItem,
  ContentItem,
  WalkMeDataCollectionItem,
  TypeName,
  TypeId,
} from '@walkme/types';
import { resolveLinks } from './collection';

export interface MapOptions {
  types?: Array<TypeName>;
}

export async function mapItem(
  item: WalkMeDataItem,
  type: TypeName,
  environmentId: number,
  options?: MapOptions
): Promise<ContentItem> {
  // const { properties } = resolvers[collection.GroupType].resolve(collection);
  const childNodes = await getChildNodes(item as WalkMeDataCollectionItem, environmentId, options);
  return {
    id: item.Id,
    description: item.Description || '',
    properties: {},
    title: item.Name,
    type,
    childNodes: childNodes.filter<ContentItem | null>(isNotNull) as ContentItem[],
  };
}

function isNotNull<T>(item: T | null): item is null {
  return !!item;
}

export function getTypeNames(typeId: TypeId): Array<TypeName> {
  if ((typeId = TypeId.BusinessSolution)) {
    return [TypeName.SmartWalkThru, TypeName.SmartTipSet];
  }
  const a = TypeId[19];
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
