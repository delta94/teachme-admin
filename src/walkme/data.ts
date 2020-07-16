import { WalkMeDataItem, TypeName } from '@walkme/types';
import walkme from '@walkme/editor-sdk';

const data: { [key in TypeName]?: Promise<Array<WalkMeDataItem>> } = {};

export async function getData(
  type: TypeName,
  environmentId: number,
  ids?: Array<number>,
): Promise<Array<WalkMeDataItem>> {
  if (!data[type]) {
    data[type] = walkme.data.getContent(type, environmentId);
  }
  const items = (await data[type]) as Array<WalkMeDataItem>;
  return ids ? items.filter((item) => ids.includes(item.Id)) : items;
}
