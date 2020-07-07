import { getData } from './data';
import { mapItem, TYPE_IDS_TO_NAME, MapOptions } from './item';
import { WalkMeLink, ContentItem } from '@walkme/types';

export async function resolveLinks(
  links: Array<WalkMeLink>,
  environmentId: number,
  options?: MapOptions
): Promise<Array<ContentItem | null>> {
  return (
    await Promise.all(
      links.map(async link => {
        const type = TYPE_IDS_TO_NAME[link.DeployableType];
        if (!options?.types?.includes(type)) return null;

        const [item] = await getData(type, environmentId, [link.DeployableID]);
        if (!item) return null;

        return mapItem(item, type, environmentId);
      })
    )
  ).filter(Boolean);
}
