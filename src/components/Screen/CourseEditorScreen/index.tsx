import React, { ReactElement, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';

import { useAppContext } from '../../../providers/AppContext';
import {
  useCourseEditorContext,
  fetchItemsList,
  fetchCourse,
  ActionType,
} from '../../../providers/CourseEditorContext';

import UnloadDialog from '../../common/UnloadDialog';

import ResourcesList from './ResourcesList';
import CourseOutline from './CourseOutline';
import CourseEditorHeader from './CourseEditorHeader';

import classes from './style.module.scss';

export default function CourseEditorScreen(): ReactElement {
  const [
    { course, isFetchingCourse, hasChanges, isSavingCourse },
    dispatch,
  ] = useCourseEditorContext();
  const [{ isUpdating, environment }] = useAppContext();
  const { courseId } = useParams();
  const history = useHistory();
  // key (locationKey) is used to reload this page when the user is already on this page
  // and they click on the 'new course' button
  const { key: locationKey } = useLocation();

  useEffect(() => {
    if (isUpdating) return;

    fetchItemsList(dispatch, environment.id);
    fetchCourse(dispatch, courseId, environment.id, history);

    return () => dispatch({ type: ActionType.ResetCourseEditor });
  }, [dispatch, courseId, environment.id, history, isUpdating, locationKey]);

  const onCourseTitleBlur = (courseTitle: string) => {
    if (course) {
      course.title = courseTitle;
    }

    dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
  };

  return (
    <div className={classes['course-editor-screen']}>
      <CourseEditorHeader
        course={course}
        courseId={courseId}
        isValid={course ? course?.isValid() : true}
        isFetchingCourse={isFetchingCourse}
        hasChanges={hasChanges}
        isSavingCourse={isSavingCourse}
        environment={environment}
        onCourseTitleBlur={onCourseTitleBlur}
        dispatch={dispatch}
      />
      <div className={classes['cards-wrapper']}>
        <ResourcesList />
        <CourseOutline />
      </div>
      <UnloadDialog when={hasChanges} />
    </div>
  );
}
