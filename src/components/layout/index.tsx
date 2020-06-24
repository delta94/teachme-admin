import React, { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Sidebar from './sidebar';
import HeaderToolbar from './header-toolbar';
import Screen from '../screen';

import './index.less';

export default function Layout(): ReactElement {
  return (
    <Router>
      <section className="app">
        <Sidebar />
        <HeaderToolbar />
        <Screen />
      </section>
    </Router>
  );
}
