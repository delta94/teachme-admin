export interface IRoute {
  id: string;
  path: string;
  title: string;
}

export const COURSES_ROUTE = {
  id: 'courses',
  path: '/courses',
  title: 'Courses',
};

export const USERS_ROUTE = {
  id: 'users',
  path: '/users',
  title: 'Users',
};

export const sidebarRoutes = [COURSES_ROUTE, USERS_ROUTE];
