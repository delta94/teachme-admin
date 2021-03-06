import * as endpoint from '../endpoint';
import { UsersListQueryOptions, UsersColumn, UsersOrder } from '../../models/users';
import { addUserTableFilters } from './filter';

export type UsersResponse = {
  num_of_records: number;
  first_item_index: number;
  sort_by: UsersColumn;
  data: Array<UsersResponseData>;
};

export type UsersResponseData = {
  id: string;
  course_id: number;
  /**  date format 'YYYY-MM-DDTHH:MM:SS.MMMZ' **/
  started_date: string;
  /**  date format 'YYYY-MM-DDTHH:MM:SS.MMMZ' **/
  completed_date: string;
  quiz_result: number;
  quiz_passed: boolean;
  time_to_complete: number;
  quiz_attempts: number;
};

const DEFAULT_OPTIONS: UsersListQueryOptions = {
  first_item_index: 0,
  num_of_records: 100,
  sort_by: UsersColumn.ID,
  sort_by_order: UsersOrder.ASC,
};

/**
 *
 * @param environment walkme environment id
 * @param from date, format (YYYY-MM-DD)
 * @param to date, format (YYYY-MM-DD)
 */
export function getUsersList(
  environment: number,
  from: string,
  to: string,
  options?: UsersListQueryOptions,
): Promise<UsersResponse> {
  const combinedOptions = { ...DEFAULT_OPTIONS, ...options };
  const query = new URLSearchParams();
  query.append('environment', `${environment}`);
  query.append('from', from);
  query.append('to', to);
  addUserTableFilters(combinedOptions, query);

  return endpoint.get(`users/list?${query.toString()}`);
}
