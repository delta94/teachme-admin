import React, { ReactElement } from 'react';
import { sidebarRoutes } from '../../../constants/routes';
import NewCourseBtn from './NewCourseButton';

import Top from './Top';
import Navigation from './Navigation';

import classes from './style.module.scss';

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
