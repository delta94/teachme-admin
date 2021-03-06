import { mapItem, TYPE_IDS_TO_NAME, MapOptions, getTypeId, mapItemSync } from './item';
import { ContentItem, WalkMeNewLink, TypeId, TypeName } from '@walkme/types';
import { getTimeProps } from 'antd/es/date-picker/generatePicker';
import { notEmpty } from '../../utils';
import { getDataSync, getData } from './wmData';

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

export function resolveLinksSync<T extends ContentItem>(
  links: Array<WalkMeNewLink>,
  environmentId: number = 0,
  options?: MapOptions<T>,
): Array<ContentItem> {
  return links
    .map((link) => {
      const type = TYPE_IDS_TO_NAME[link.DeployableType];
      if (options?.types && !options?.types?.includes(type)) return null;

      const [item] = getDataSync(link.DeployableType, [link.DeployableID]);
      if (!item) return null;

      return mapItemSync(item, type, environmentId, options);
    })
    .filter(notEmpty);
}

export function createLink(
  child: ContentItem,
  index: number,
  getSettings?: (item: ContentItem) => any,
): WalkMeNewLink {
  return {
    DeployableID: <number>child.id > 0 ? <number>child.id : -(index + 1),
    DeployableType: getTypeId(child.type),
    OrderIndex: index,
    Settings: getSettings?.(child),
  };
}
