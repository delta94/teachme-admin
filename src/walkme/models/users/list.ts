import { UsersTableQueryFilter } from './filter';

/**
 * Query options for the users list API
 */
export type UsersListQueryOptions = UsersTableQueryFilter & {
  /**
   * Defines the index from which to search,
   * Use this option to request additional data after the first result batch
   * @default 0
   */
  first_item_index: number;
  /**
   * Defines the maximum number of results to be returned,
   * @default 100
   */
  num_of_records: number;
  /**
   * Defines the column by which to sort the results,
   * @default UsersColumn.ID
   */
  sort_by: UsersColumn;
  /**
   * Defines the order of the sorting,
   * @default UsersOrder.ASC
   */
  sort_by_order: UsersOrder;
};

/**
 * A set of the a users table columns to be used for server requests
 */
export enum UsersColumn {
  ID = 'id',
  COURSE_ID = 'course_id',
  COMPLETED_DATE = 'completed_date',
  QUIZ_RESULT = 'quiz_result',
  QUIZ_ATTEMPTS = 'quiz_attempts',
  STARTED_DATE = 'started_date',
  TIME_TO_COMPLETE = 'time_to_complete',
}

/**
 * Ordering options for the users table
 */
export enum UsersOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

/**
 * Response object users list api
 */
export type UserListUIResponse = {
  /**
   * Max records as sent in the request
   * Add this number to the first_item_index option to get the next first_item_index option
   */
  num_of_records: number;
  /** Index of the first item as sent in the request */
  first_item_index: number;
  /** Sort option as sent in the request */
  sort_by: UsersColumn;
  /** Users table line items data */
  data: Array<UserListUILineItem>;
};

/**
 * Users table line items data
 */
export type UserListUILineItem = {
  /** End user id - can be en email or any string */
  id: string;
  /** Course title */
  title: string;
  /** Course start date or null if not in range */
  started_date: Date | null;
  /** Course completed date or null if not in range */
  completed_date: Date | null;
  /** Total course time in milliseconds  */
  time_to_complete?: number | null;
  /** Last quiz result or null if not in range */
  quiz_result: number | null;
  /** Indication on quiz pass or null if not in range */
  quiz_passed: boolean | null;
  /** Number of quiz attempts in the time range  */
  quiz_attempts: number;
};
