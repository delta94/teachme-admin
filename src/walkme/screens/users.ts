import * as data from '../data';
import * as analytics from '../analytics';
import {
  UsersListQueryOptions,
  UsersCountQueryOptions,
  UsersCountResponse,
  UserListUIResponse,
} from '../models/users';

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
