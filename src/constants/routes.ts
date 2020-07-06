import { IconType } from '../components/common/Icon/icon.interface';
import { coursesMockData } from './mocks/courses-mock';
import { usersMockData } from './mocks/users-mock';

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

export const NEWCOURSE_ROUTE = {
  id: 'new-course',
  path: '/new-course',
  title: 'new-course',
};

export const sidebarRoutes = [COURSES_ROUTE, USERS_ROUTE];
