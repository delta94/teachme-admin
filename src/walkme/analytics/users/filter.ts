import { UsersTableQueryFilter } from '../../models/users/filter';

export function addUserTableFilters(options: UsersTableQueryFilter, query: URLSearchParams) {
  for (const [key, value] of Object.entries(options)) {
    query.append(key, typeof value === 'string' ? value : JSON.stringify(value));
  }
}
