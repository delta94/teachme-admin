import { WalkMeDataItem, TypeName } from '@walkme/types';
import walkme from '@walkme/editor-sdk';
import { getTypeId } from './item';

const data: { [key in TypeName]?: Promise<Array<WalkMeDataItem>> } = {};
const syncData: { [type: number]: Array<WalkMeDataItem> } = {};

export async function getData(
  type: TypeName,
  environmentId: number,
  ids?: Array<number>,
  light?: boolean,
): Promise<Array<WalkMeDataItem>> {
  if (!data[type]) {
    data[type] = walkme.data.getContent(type, environmentId, light);
  }
  const items = (await data[type]) as Array<WalkMeDataItem>;
  syncData[getTypeId(type)] = items;
  return filter(items, ids);
}

export function getDataSync(type: number, ids?: Array<number>): Array<WalkMeDataItem> {
  const items = syncData[type];
  if (!items) {
    throw `unable to get data synchronously - call getData first to get it in a sync manner`;
  }
  return filter(items, ids);
}

function filter(items: Array<WalkMeDataItem>, ids?: Array<number>): Array<WalkMeDataItem> {
  return ids ? items.filter((item) => ids.includes(item.Id)) : items;
}
