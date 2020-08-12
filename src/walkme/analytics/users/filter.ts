import { UsersTableQueryFilter } from '../../models/users/filter';

export function addUserTableFilters(options: UsersTableQueryFilter, query: URLSearchParams) {
  if (options.user_name) query.append('user_name', options.user_name);
  if (options.course_id) query.append('course_id', JSON.stringify(options.course_id));
  if (options.course_completed) query.append('.course_completed', `${options.course_completed}`);
  if (options.quiz_passed) query.append('q.quiz_passed', `${options.quiz_passed}`);
}
