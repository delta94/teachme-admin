import { WalkMeDataItem, TypeName, TypeId } from '@walkme/types';
import walkme from '@walkme/editor-sdk';
import { getTypeId } from './item';
import { TypeNotSupportedError } from '../../models';

let data: { [key in TypeName]?: Promise<Array<WalkMeDataItem>> } = {};
let syncData: { [type: number]: Array<WalkMeDataItem> } = {};

export async function getData(
  type: TypeName,
  environmentId: number,
  ids?: Array<number>,
  light?: boolean,
): Promise<Array<WalkMeDataItem>> {
  if (!data[type]) {
    data[type] = getByType(type, environmentId);
  }
  const items = (await data[type]) as Array<WalkMeDataItem>;
  syncData[getTypeId(type)] = items;
  return filter(items, ids);
}

export function getDataSync(type: number, ids?: Array<number>): Array<WalkMeDataItem> {
  if (type == TypeId.Walkthru) {
    throw new TypeNotSupportedError(`TeachMe does not support type ${type}`);
  }
  const items = syncData[type];
  if (!items) {
    throw new Error(
      `unable to get data synchronously - call getData first to get it in a sync manner`,
    );
  }
  return filter(items, ids);
}

function filter(items: Array<WalkMeDataItem>, ids?: Array<number>): Array<WalkMeDataItem> {
  return ids ? items.filter((item) => ids.includes(item.Id)) : items;
}

export async function refresh(types: Array<TypeName>, environmentId: number = 0): Promise<void> {
  await Promise.all(
    types.map((type) => {
      delete data[type];
      return getData(type, environmentId);
    }),
  );
}

export function clear() {
  data = {};
  syncData = {};
}

function getByType(type: TypeName, environmentId: number) {
  switch (type) {
    case TypeName.Folder:
      return walkme.data.getFolders(environmentId);
    default:
      return walkme.data.geContentMetadata(type, environmentId);
  }
}

export async function getDefaultFolder(environmentId: number): Promise<WalkMeDataItem> {
  const folders = await getData(TypeName.Folder, environmentId);
  const defaultFolder = folders.find((folder) => folder.Settings.isDefaultFolder);
  if (!defaultFolder) throw new Error('Unable to find users default folder');

  return defaultFolder;
}
