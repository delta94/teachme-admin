import React, { ReactElement } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { COURSES_ROUTE, USERS_ROUTE, COURSE_EDITOR_ROUTE } from '../../constants/routes';
import CoursesScreen from './CoursesScreen';
import UsersScreen from './UsersScreen';
import EditorCourseScreen from './EditorCourseScreen';

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
        <Route path={COURSE_EDITOR_ROUTE.path}>
          <EditorCourseScreen />
        </Route>
        <Route path="/">
          <Redirect to={COURSES_ROUTE.path} />
        </Route>
      </Switch>
    </section>
  );
}
