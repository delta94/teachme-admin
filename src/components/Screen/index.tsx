import React, { ReactElement } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import {
  COURSES_ROUTE,
  COURSE_ROUTE,
  USERS_ROUTE,
  COURSE_EDITOR_ROUTE,
  NEW_COURSE_EDITOR_ROUTE,
  PLAYGROUND_ROUTE,
} from '../../constants/routes';
import CourseEditorProvider from '../../providers/CourseEditorContext';
import CoursesProvider from '../../providers/CoursesContext';
import CourseProvider from '../../providers/CourseContext';
import UsersProvider from '../../providers/UsersContext';

import SplashScreen from './SplashScreen';
import ErrorScreen from './ErrorScreen';
import CoursesScreen from './CoursesScreen';
import CourseScreen from './CourseScreen';
import UsersScreen from './UsersScreen';
import CourseEditorScreen from './CourseEditorScreen';
import Playground from './Playground';

import classes from './style.module.scss';

export default function Screen(): ReactElement {
  return (
    <section className={classes.screen}>
      <Switch>
        <Route path={COURSES_ROUTE.path}>
          <CoursesProvider>
            <CoursesScreen />
          </CoursesProvider>
        </Route>
        <Route path={COURSE_ROUTE.path}>
          <CourseProvider>
            <CourseScreen />
          </CourseProvider>
        </Route>
        <Route path={USERS_ROUTE.path}>
          <UsersProvider>
            <UsersScreen />
          </UsersProvider>
        </Route>
        <Route path={[NEW_COURSE_EDITOR_ROUTE.path, COURSE_EDITOR_ROUTE.path]}>
          <CourseEditorProvider>
            <CourseEditorScreen />
          </CourseEditorProvider>
        </Route>
        <Route path={PLAYGROUND_ROUTE.path}>
          <Playground />
        </Route>
        <Route path="/">
          <Redirect to={COURSES_ROUTE.path} />
        </Route>
      </Switch>
    </section>
  );
}

export { SplashScreen, ErrorScreen };
