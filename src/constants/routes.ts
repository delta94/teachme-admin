import { coursesMockData } from './mocks/courses-mock';
import { usersMockData } from './mocks/users-mock';

export interface IRoute {
  id: string;
  path: string;
  title: string;
}

export const COURSES_ROUTE = {
  id: 'courses',
  path: '/courses',
  title: coursesMockData.title,
};

export const USERS_ROUTE = {
  id: 'users',
  path: '/users',
  title: usersMockData.title,
};

export const sidebarRoutes = [COURSES_ROUTE, USERS_ROUTE];
