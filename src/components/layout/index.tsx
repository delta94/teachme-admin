import React, { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Sidebar from './sidebar';
import HeaderToolbar from './header-toolbar';
import Screen from '../screen';

import './index.scss';

export default function Layout(): ReactElement {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <section className="app">
        <Sidebar />
        <HeaderToolbar />
        <Screen />
      </section>
    </Router>
  );
}
