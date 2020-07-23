import * as data from '../data';
import * as analytics from '../analytics';
import {
  UsersListQueryOptions,
  UsersCountQueryOptions,
  UsersCountResponse,
  UserListUIResponse,
} from '../models/users';
import { saveAsCsv } from '../utils';

/**
 * Returns a list of users and their data
 * @param environment the requested environment id
 * @param from start date, format YYYY-MM-DD
 * @param to end date, format YYYY-MM-DD
 * @param options pagination and search options - see object documentation
 */
export function getUsersList(
  environment: number,
  from: string,
  to: string,
  options: UsersListQueryOptions,
): Promise<UserListUIResponse> {
  return data.getUsersList(environment, from, to, options);
}

/**
 * Returns the count of all the users with interaction within the time frame
 * @param environment the requested environment id
 * @param from start date, format YYYY-MM-DD
 * @param to end date, format YYYY-MM-DD
 * @param options search options - see object documentation
 */
export function getUsersCount(
  environment: number,
  from: string,
  to: string,
  options: UsersCountQueryOptions,
): Promise<UsersCountResponse> {
  return analytics.getUsersCount(environment, from, to, options);
}

export async function exportData(
  environment: number,
  from: string,
  to: string,
  options: UsersListQueryOptions,
): Promise<void> {
  const { total_rows } = await getUsersCount(environment, from, to, options);
  const lines = await getUsersList(environment, from, to, {
    ...options,
    num_of_records: total_rows,
  });
  return saveAsCsv(
    lines.data,
    [
      'id',
      'title',
      'started_date',
      'completed_date',
      'quiz_result',
      'quiz_passed',
      'quiz_attempts',
    ],
    `teachme-users-data-${Date.now()}`,
  );
}
