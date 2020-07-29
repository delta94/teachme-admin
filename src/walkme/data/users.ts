import * as users from '../analytics/users';
import { index, notEmpty } from '../utils';
import { getCourseMetadata } from './courseBuild';
import { UsersListQueryOptions, UserListUIResponse, UserListUILineItem } from '../models/users';

/**
 *
 * @param environment walkme environment id
 * @param from date, format (YYYY-MM-DD)
 * @param to date, format (YYYY-MM-DD)
 * @param options pagination options
 */
export async function getUsersList(
  environment: number,
  from: string,
  to: string,
  options?: UsersListQueryOptions,
): Promise<UserListUIResponse> {
  const usersData = await users.getUsersList(environment, from, to, options);
  return {
    first_item_index: usersData.first_item_index,
    num_of_records: usersData.num_of_records,
    sort_by: usersData.sort_by,
    data: await getDataItems(usersData.data, environment),
  };
}

async function getDataItems(
  data: Array<users.UsersResponseData>,
  environment: number,
): Promise<Array<UserListUILineItem>> {
  const courses = await Promise.all(
    data.map((item) => item.course_id).map((id) => getCourseMetadata(id, environment)),
  );
  const indexed = index(courses, 'id');
  return data
    .map<UserListUILineItem | null>((item) => {
      const course = indexed[item.course_id];
      return course
        ? {
            id: item.id,
            completed_date: getDate(item.completed_date),
            started_date: getDate(item.started_date),
            quiz_attempts: item.quiz_attempts,
            quiz_passed: item.quiz_passed,
            quiz_result: item.quiz_result,
            title: course.title,
          }
        : null;
    })
    .filter(notEmpty);
}

function getDate(dateStr: string): Date | null {
  const date = new Date(dateStr);
  return isNaN(date.getDate()) ? null : date;
}
