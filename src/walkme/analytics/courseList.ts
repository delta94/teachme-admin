import * as endpoint from './endpoint';

export interface CourseListItem {
  course_id: number;
  users_started: number;
  users_completed: number;
  avg_quiz_score: number;
  avg_quiz_attempts: number;
}

export type CourseListData = Array<CourseListItem>;

/**
 *
 * @param environment walkme environment id
 * @param from date, format (YYYY-MM-DD)
 * @param to date, format (YYYY-MM-DD)
 */
export function getCourseListData(
  environment: number,
  from: string,
  to: string,
): Promise<CourseListData> {
  const query = new URLSearchParams();
  query.append('environment', environment.toString());
  query.append('from', from);
  query.append('to', to);
  return endpoint.get(`course/list?${query.toString()}`);
}
