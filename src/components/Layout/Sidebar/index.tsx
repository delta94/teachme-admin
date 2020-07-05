import React, { ReactElement } from 'react';

import { COURSES_ROUTE, COURSE_ROUTE, USERS_ROUTE } from '../../../constants/routes';

import Top from './Top';
import Navigation from './Navigation';

import classes from './style.module.scss';

const sidebarRoutes = [COURSES_ROUTE, COURSE_ROUTE, USERS_ROUTE];

export default function Sidebar(): ReactElement {
  return (
    <aside className={classes.sidebar}>
      <Top />
      <Navigation routes={sidebarRoutes} />
    </aside>
  );
}
