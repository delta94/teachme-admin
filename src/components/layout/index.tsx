import React, { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Screen from '../Screen';
import Sidebar from './Sidebar';
import HeaderToolbar from './HeaderToolbar';

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
