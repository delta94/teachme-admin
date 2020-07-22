import * as endpoint from './endpoint';
import { TypeId, TypeName } from '@walkme/types';
import { types } from 'util';

export enum APITypes {
  Content = 'resource',
  SWT = 'bizFlow',
}

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
  quiz_result: boolean;
  quiz_passed: boolean;
  time_to_complete: boolean;
  quiz_attempts: number;
};

export enum UsersColumn {
  ID = 'id',
  COURSE_ID = 'course_id',
  COMPLETED_DATE = 'completed_date',
  QUIZ_RESULT = 'quiz_result',
  QUIZ_ATTEMPTS = 'quiz_attempts',
  STARTED_DATE = 'started_date',
  TIME_TO_COMPLETE = 'time_to_complete',
}

export enum UsersOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type UsersQueryOptions = {
  first_item_index: number;
  num_of_records: number;
  sort_by: UsersColumn;
  sort_by_order: UsersOrder;
  user_name?: string;
};

const DEFAULT_OPTIONS: UsersQueryOptions = {
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
export function getList(
  environment: number,
  from: string,
  to: string,
  options: UsersQueryOptions,
): Promise<UsersResponse> {
  const combinedOptions = { ...DEFAULT_OPTIONS, ...options };
  const query = new URLSearchParams();
  query.append('environment', `${environment}`);
  query.append('from', from);
  query.append('to', to);
  query.append('first_item_index', `${combinedOptions.first_item_index}`);
  query.append('num_of_records', `${combinedOptions.num_of_records}`);
  query.append('sort_by', combinedOptions.sort_by);
  query.append('sort_by_order', combinedOptions.sort_by_order);
  if (combinedOptions.user_name) query.append('user_name', combinedOptions.user_name);
  
  return endpoint.get(`users/list?${query.toString()}`);
}
