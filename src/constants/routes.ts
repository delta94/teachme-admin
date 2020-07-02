import { IconType } from '../components/common/Icon/icon.interface';
import { coursesMockData } from './mocks/courses-mock';
import { usersMockData } from './mocks/users-mock';

export interface IRoute {
  id: string;
  path: string;
  title?: string;
  iconType?: IconType;
}

export const COURSES_ROUTE = {
  id: 'courses',
  iconType: IconType.SidebarCourses,
  path: '/courses',
  title: coursesMockData.title,
};

export const USERS_ROUTE = {
  id: 'users',
  iconType: IconType.SidebarUsers,
  path: '/users',
  title: usersMockData.title,
};

export const NEWCOURSE_ROUTE = {
  id: 'new-course',
  path: '/new-course',
};

export const sidebarRoutes = [COURSES_ROUTE, USERS_ROUTE];
export const newCourse = [NEWCOURSE_ROUTE];
