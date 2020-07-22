import * as endpoint from '../endpoint';
import { CourseOverviewResponse } from '.';

export function getSingleCourseOverview(
  course_id: number,
  environment: number,
  from: string,
  to: string,
): Promise<CourseOverviewResponse> {
  const query = new URLSearchParams();
  query.append('environment', `${environment}`);
  query.append('from', from);
  query.append('to', to);

  return endpoint.get(`course/get/${course_id}?${query.toString()}`);
}
