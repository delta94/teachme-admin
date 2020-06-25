import React, { ReactElement } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { COURSES_ROUTE, USERS_ROUTE } from '../../constants/routes';
import CoursesScreen from '../screen/courses-screen';
import UsersScreen from '../screen/users-screen';

import classes from './style.module.scss';

export default function Screen(): ReactElement {
  return (
    <section className={classes.screen}>
      <Switch>
        <Route path={COURSES_ROUTE.path}>
          <CoursesScreen />
        </Route>
        <Route path={USERS_ROUTE.path}>
          <UsersScreen />
        </Route>
        <Route path="/">
          <Redirect to={COURSES_ROUTE.path} />
        </Route>
      </Switch>
    </section>
  );
}
