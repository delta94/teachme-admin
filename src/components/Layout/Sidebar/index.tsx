import React, { ReactElement } from 'react';

import { COURSES_ROUTE, COURSE_ROUTE, USERS_ROUTE } from '../../../constants/routes';

import NewCourseBtn from './NewCourseButton';
import Top from './Top';
import Navigation from './Navigation';

import classes from './style.module.scss';

const sidebarRoutes = [COURSES_ROUTE, COURSE_ROUTE, USERS_ROUTE];

export default function Sidebar(): ReactElement {
  return (
    <aside className={classes.sidebar}>
      <div className={classes.top}>
        <Top />
        <Navigation routes={sidebarRoutes} />
      </div>
      <div className={classes.bottom}>
        <NewCourseBtn />
      </div>
    </aside>
  );
}
