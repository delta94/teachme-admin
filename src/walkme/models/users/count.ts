/**
 * Response object users count api
 */
export type UsersCountResponse = {
  /** number of rows scanned */
  total_rows: number;
  /** number of unique users */
  totals_unique_users: number;
};
