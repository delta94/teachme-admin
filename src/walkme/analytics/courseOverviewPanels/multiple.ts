import * as endpoint from '../endpoint';
import { AllCoursesOverviewResponse } from '.';

export function getAllCoursesOverview(
  environment: number,
  from: string,
  to: string,
): Promise<AllCoursesOverviewResponse> {
  const query = new URLSearchParams();
  query.append('environment', `${environment}`);
  query.append('from', from);
  query.append('to', to);

  return endpoint.get(`course/overview?${query.toString()}`);
}
