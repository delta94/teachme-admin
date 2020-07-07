import React, { ReactElement } from 'react';

import { COURSES_ROUTE, COURSE_ROUTE, USERS_ROUTE } from '../../../constants/routes';

import NewCourseBtn from './NewCourseButton';
import Logo from './Logo';
import Navigation from './Navigation';

import classes from './style.module.scss';
import { Divider } from 'antd';

const sidebarRoutes = [COURSES_ROUTE, COURSE_ROUTE, USERS_ROUTE];

export default function Sidebar(): ReactElement {
  return (
    <nav className={classes.sidebar}>
      <div>
        <Logo />
        <Divider className={classes['sidebar-separator']} />
        <Navigation routes={sidebarRoutes} />
      </div>
      <div>
        <Divider className={classes['sidebar-separator']} />
        <NewCourseBtn />
      </div>
    </nav>
  );
}
