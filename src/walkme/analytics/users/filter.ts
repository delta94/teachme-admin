import { UsersTableQueryFilter } from '../../models/users/filter';

export function addUserTableFilters(options: UsersTableQueryFilter, query: URLSearchParams) {
  for (const [key, value] of Object.entries(options)) {
    value != null && query.append(key, typeof value === 'string' ? value : JSON.stringify(value));
  }
}
