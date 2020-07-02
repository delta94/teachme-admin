import React, { ReactElement } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { COURSES_ROUTE, COURSE_ROUTE, USERS_ROUTE } from '../../constants/routes';
import CoursesScreen from './CoursesScreen';
import UsersScreen from './UsersScreen';

import classes from './style.module.scss';
import CourseScreen from './CourseScreen';

export default function Screen(): ReactElement {
  return (
    <section className={classes.screen}>
      <Switch>
        <Route path={COURSES_ROUTE.path} component={CoursesScreen} />
        <Route path={COURSE_ROUTE.path} component={CourseScreen} />
        <Route path={USERS_ROUTE.path} component={UsersScreen} />
        <Route path="/">
          <Redirect to={COURSES_ROUTE.path} />
        </Route>
      </Switch>
    </section>
  );
}
