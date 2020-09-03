import React, { ReactElement, useCallback, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

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
    {
      course,
      isFetchingCourse,
      hasChanges,
      isDetailsPanelOpen,
      activeDetailsItem,
      quiz,
      isSavingCourse,
      isFetchingItems,
      courseItems,
      filteredCourseItems,
      courseItemsSearchValue,
    },
    dispatch,
  ] = useCourseEditorContext();
  const [
    {
      isUpdating,
      environment,
      environment: { id: envId },
    },
  ] = useAppContext();
  const { courseId } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (isUpdating) return;

    fetchItemsList(dispatch, environment.id);
    fetchCourse(dispatch, courseId, environment.id, history);

    return () => dispatch({ type: ActionType.ResetCourseEditor });
  }, [dispatch, courseId, environment.id, history, isUpdating]);

  const onCourseTitleBlur = useCallback(
    (courseTitle: string) => {
      if (course) {
        course.title = courseTitle;
      }

      dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
    },
    [course, dispatch],
  );

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
        <ResourcesList
          course={course}
          isFetchingItems={isFetchingItems}
          courseItems={courseItems}
          filteredCourseItems={filteredCourseItems}
          courseItemsSearchValue={courseItemsSearchValue}
          isUpdating={isUpdating}
          envId={envId}
          courseItemsLength={course?.items.toArray().length}
          dispatch={dispatch}
        />
        <CourseOutline
          isDetailsPanelOpen={isDetailsPanelOpen}
          course={course}
          activeDetailsItem={activeDetailsItem}
          isFetchingCourse={isFetchingCourse}
          quiz={quiz}
          isUpdating={isUpdating}
          envId={envId}
          dispatch={dispatch}
        />
      </div>
      <UnloadDialog when={hasChanges} />
    </div>
  );
}
