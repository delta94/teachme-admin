import defaults from '../courseBuild/defaults';
import * as wmData from './wmData';
import { TypeId } from '@walkme/types';
import { notEmpty } from '../../utils';

export function getUniqueItemName(type: TypeId, baseName: string): string {
  const itemNames = wmData.getDataSync(type).map((item) => item.Name);
  const pattern = new RegExp(`^${baseName} (\\d+)$`, 'i');
  const counters = itemNames
    .map((name) => name.match(pattern)?.[1])
    .filter(notEmpty)
    .map((x) => parseInt(x));
  return `${baseName} ${Math.max(0, ...counters) + 1}`;
}
