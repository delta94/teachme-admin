import React, { ReactElement } from 'react';

import { sidebarRoutes } from '../../../constants/routes';

import Top from './Top';
import Navigation from './Navigation';

import classes from './style.module.scss';

export default function Sidebar(): ReactElement {
  return (
    <aside className={classes.sidebar}>
      <Top />
      <Navigation routes={sidebarRoutes} />
    </aside>
  );
}
