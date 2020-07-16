import { getData } from './data';
import { mapItem, TYPE_IDS_TO_NAME, MapOptions, getTypeId } from './item';
import { ContentItem, WalkMeNewLink, TypeId, TypeName } from '@walkme/types';
import { getTimeProps } from 'antd/es/date-picker/generatePicker';
import { notEmpty } from './utils';

export async function resolveLinks<T extends ContentItem>(
  links: Array<WalkMeNewLink>,
  environmentId: number = 0,
  options?: MapOptions<T>,
): Promise<Array<ContentItem>> {
  return (
    await Promise.all(
      links.map(async (link) => {
        const type = TYPE_IDS_TO_NAME[link.DeployableType];
        if (options?.types && !options?.types?.includes(type)) return null;

        const [item] = await getData(type, environmentId, [link.DeployableID]);
        if (!item) return null;

        return mapItem(item, type, environmentId, options);
      }),
    )
  ).filter(notEmpty);
}

export function createLink(
  child: ContentItem,
  index: number,
  getSettings?: (item: ContentItem) => any,
): WalkMeNewLink {
  return {
    DeployableID: child.id as number,
    DeployableType: getTypeId(child.type),
    OrderIndex: index,
    Settings: getSettings?.(child),
  };
}
