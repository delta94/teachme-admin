import React, { ReactElement } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import {
  COURSES_ROUTE,
  COURSE_ROUTE,
  USERS_ROUTE,
  COURSE_EDITOR_ROUTE,
  NEW_COURSE_EDITOR_ROUTE,
} from '../../constants/routes';

import CoursesScreen from './CoursesScreen';
import CourseScreen from './CourseScreen';
import UsersScreen from './UsersScreen';
import EditorCourseScreen from './CourseEditorScreen';

import classes from './style.module.scss';

export default function Screen(): ReactElement {
  return (
    <section className={classes.screen}>
      <Switch>
        <Route path={COURSES_ROUTE.path}>
          <CoursesScreen />
        </Route>
        <Route path={COURSE_ROUTE.path}>
          <CourseScreen />
        </Route>
        <Route path={USERS_ROUTE.path}>
          <UsersScreen />
        </Route>
        <Route path={NEW_COURSE_EDITOR_ROUTE.path}>
          <EditorCourseScreen />
        </Route>
        <Route path={COURSE_EDITOR_ROUTE.path}>
          <Redirect to={NEW_COURSE_EDITOR_ROUTE.path} />
        </Route>
        <Route path="/">
          <Redirect to={COURSES_ROUTE.path} />
        </Route>
      </Switch>
    </section>
  );
}
