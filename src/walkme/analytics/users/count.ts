import * as endpoint from '../endpoint';
import { UsersCountResponse } from '../../models/users';
import { UsersTableQueryFilter } from '../../models/users/filter';
import { addUserTableFilters } from './filter';

const DEFAULT_OPTIONS: UsersTableQueryFilter = {};

export function getUsersCount(
  environment: number,
  from: string,
  to: string,
  options?: UsersTableQueryFilter,
): Promise<UsersCountResponse> {
  const combinedOptions = { ...DEFAULT_OPTIONS, ...options };
  const query = new URLSearchParams();
  query.append('environment', `${environment}`);
  query.append('from', from);
  query.append('to', to);
  addUserTableFilters(combinedOptions, query);

  return endpoint.get(`users/count?${query.toString()}`);
}
