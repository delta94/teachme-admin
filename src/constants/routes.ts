import { coursesMockData } from './mocks/courses-mock';
import { usersMockData } from './mocks/users-mock';

import { IconType } from '../components/common/Icon/icon.interface';

export interface IRoute {
  id: string;
  path: string;
  title?: string;
  matches?: string[];
  iconType?: IconType;
  hideInSidebar?: boolean;
}

export const COURSES_ROUTE = {
  id: 'courses',
  iconType: IconType.SidebarCourses,
  matches: ['courses', 'course'],
  path: '/courses',
  title: coursesMockData.title,
};

export const COURSE_ROUTE = {
  id: 'courses',
  path: '/course/:courseId',
  hideInSidebar: true,
};

export const USERS_ROUTE = {
  id: 'users',
  iconType: IconType.SidebarUsers,
  path: '/users',
  matches: ['users'],
  title: usersMockData.title,
};
