import React, { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Sidebar from './sidebar';
import HeaderToolbar from './HeaderToolbar';
import Screen from '../screen';

import classes from './style.module.scss';

export default function Layout(): ReactElement {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <section className={classes.app}>
        <Sidebar />
        <HeaderToolbar />
        <Screen />
      </section>
    </Router>
  );
}
