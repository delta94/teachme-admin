import * as endpoint from './endpoint';
import { TypeId, TypeName } from '@walkme/types';
import { types } from 'util';

export enum APITypes {
  Content = 'resource',
  SWT = 'bizFlow',
}
export interface CourseOutlineItem {
  item_id: number;
  item_type: APITypes;
  users_complete: number;
}

export type CourseOutlineData = Array<CourseOutlineItem>;

/**
 *
 * @param environment walkme environment id
 * @param from date, format (YYYY-MM-DD)
 * @param to date, format (YYYY-MM-DD)
 */
export function getCourseOutlineData(
  course_id: number,
  environment: number,
  from: string,
  to: string,
): Promise<CourseOutlineData> {
  const query = new URLSearchParams();
  query.append('environment', environment.toString());
  query.append('from', from);
  query.append('to', to);
  return endpoint.get(`course/outline/${course_id}?${query.toString()}`);
}

export function matchesServerType(itemType: TypeName, serverType: APITypes): boolean {
  switch (serverType) {
    case APITypes.Content:
      return [TypeName.Content, TypeName.Video, TypeName.Article].includes(itemType);
    case APITypes.SWT:
      return itemType == TypeName.SmartWalkThru;
  }
}
