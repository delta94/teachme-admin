import * as data from '../data';
import * as analytics from '../analytics';
import { UsersListQueryOptions, UsersCountResponse, UserListUIResponse } from '../models/users';
import { saveAsCsv } from '../utils';
import { UsersTableQueryFilter } from '../models/users/filter';

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
  options?: UsersListQueryOptions,
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
  options?: UsersTableQueryFilter,
): Promise<UsersCountResponse> {
  return analytics.getUsersCount(environment, from, to, options);
}

/**
 * Downloads the users data as csv
 * @param environmentId requested environment id
 * @param from start date in format YYYY-MM-DD
 * @param to end date in format YYYY-MM-DD
 * @param options pagination and search options - see object documentation
 * @returns a promise that is resolved once the file is downloaded
 */
export async function exportUsersData(
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
