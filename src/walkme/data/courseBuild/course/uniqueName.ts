import defaults from '../defaults';
import * as wmData from '../../services/wmData';
import { TypeId } from '@walkme/types';
import { notEmpty } from '../../../utils';

export function getUniqueCourseName(): string {
  const courseNames = wmData.getDataSync(TypeId.Course).map((course) => course.Name);
  const pattern = new RegExp(`^${defaults.COURSE_NAME} (\\d+)$`, 'i');
  const counters = courseNames
    .map((name) => name.match(pattern)?.[1])
    .filter(notEmpty)
    .map((x) => parseInt(x));
  return `${defaults.COURSE_NAME} ${Math.max(0, ...counters) + 1}`;
}
