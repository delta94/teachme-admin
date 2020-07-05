import { WalkMeDataItem } from '@walkme/types';
import walkme, { TYPE_NAMES, TYPE_IDS } from '@walkme/editor-sdk';

const data: { [key in TYPE_NAMES]?: Promise<Array<WalkMeDataItem>> } = {};

export async function getData(
  type: TYPE_NAMES,
  environmentId: number,
  ids?: Array<number>,
): Promise<Array<WalkMeDataItem>> {
  if (!data[type]) {
    data[type] = walkme.data.getContent(type, environmentId);
  }
  const items = (await data[type]) as Array<WalkMeDataItem>;
  return ids ? items.filter((item) => ids.includes(item.Id)) : items;
}
