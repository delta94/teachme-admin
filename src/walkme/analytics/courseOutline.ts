import * as endpoint from './endpoint';
import { TypeId } from '@walkme/types';

export interface CourseOutlineItem {
  id: number;
  type: TypeId;
  users_completed: number;
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
