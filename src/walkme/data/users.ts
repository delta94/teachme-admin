import * as users from '../analytics/users';
import { index, notEmpty } from '../utils';
import { getCourseMetadata } from './courseBuild';
import * as wmData from './services/wmData';
import { UsersListQueryOptions, UserListUIResponse, UserListUILineItem } from '../models/users';
import { TypeName } from '@walkme/types';

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
  const courses = await wmData.getData(TypeName.Course, environment);

  const indexed = index(courses, 'Id');
  return data
    .map<UserListUILineItem | null>((item) => {
      const course = indexed[item.course_id];
      const started_date = getDate(item.started_date);
      const completed_date = getDate(item.completed_date);
      const time_to_complete =
        started_date && completed_date && completed_date.getTime() - started_date.getTime();
      return course
        ? {
            id: item.id,
            completed_date,
            started_date,
            time_to_complete,
            quiz_attempts: item.quiz_attempts,
            quiz_passed: item.quiz_passed,
            quiz_result: item.quiz_result,
            title: course.Name,
          }
        : null;
    })
    .filter(notEmpty);
}

function getDate(dateStr: string): Date | null {
  if (!dateStr) return null;

  const date = new Date(dateStr);
  return isNaN(date.getDate()) ? null : date;
}
