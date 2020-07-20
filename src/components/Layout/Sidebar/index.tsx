import React, { ReactElement } from 'react';
import { Divider } from 'antd';

import { COURSES_ROUTE, COURSE_ROUTE, USERS_ROUTE } from '../../../constants/routes';

import Logo from '../../common/Logo';

import NewCourseBtn from './NewCourseButton';
import Navigation from './Navigation';

import classes from './style.module.scss';

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
