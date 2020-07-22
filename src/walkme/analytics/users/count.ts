import * as endpoint from '../endpoint';
import { UsersCountQueryOptions, UsersCountResponse } from '../../models/users';

const DEFAULT_OPTIONS: UsersCountQueryOptions = {};

export function getUsersCount(
  environment: number,
  from: string,
  to: string,
  options?: UsersCountQueryOptions,
): Promise<UsersCountResponse> {
  const combinedOptions = { ...DEFAULT_OPTIONS, ...options };
  const query = new URLSearchParams();
  query.append('environment', `${environment}`);
  query.append('from', from);
  query.append('to', to);
  if (combinedOptions.user_name) query.append('user_name', combinedOptions.user_name);

  return endpoint.get(`users/count?${query.toString()}`);
}
