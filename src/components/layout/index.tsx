import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Sidebar from './sidebar';
import HeaderToolbar from './header-toolbar';

import CoursesScreen from '../screen/courses-screen';

import './index.less';

export default function Layout(): ReactElement {
  return (
    <Router>
      <section className="app">
        <Sidebar />
        <HeaderToolbar />
        <div className="content">
          <Switch>
            <Route path="/courses">
              <CoursesScreen />
            </Route>
            <Route path="/">
              <Redirect to="/courses" />
            </Route>
          </Switch>
        </div>
      </section>
    </Router>
  );
}
