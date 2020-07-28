import React, { ReactElement, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  useCourseEditorContext,
  fetchItemsList,
  fetchCourse,
  ActionType,
} from '../../../providers/CourseEditorContext';

import EditableTitle from '../../common/EditableTitle';
import ScreenHeader from '../../common/ScreenHeader';

import ResourcesList from './ResourcesList';
import CourseOutline from './CourseOutline';
import classes from './style.module.scss';

export default function CourseEditorScreen(): ReactElement {
  const [{ courseTitle, isFetchingCourse }, dispatch] = useCourseEditorContext();
  const { courseId } = useParams();

  useEffect(() => {
    fetchItemsList(dispatch);
    fetchCourse(dispatch, courseId);

    return () => dispatch({ type: ActionType.ResetCourseEditor });
  }, [dispatch, courseId]);

  const onCourseTitleBlur = (courseTitle: string) =>
    dispatch({ type: ActionType.SetCourseTitle, courseTitle });

  return (
    <>
      <ScreenHeader
        title={
          <EditableTitle
            isNew={!courseId}
            isLoading={isFetchingCourse}
            value={courseTitle}
            onBlur={onCourseTitleBlur}
          />
        }
        hideTimeFilter={true}
      />
      <div className={classes['cards-wrapper']}>
        <ResourcesList />
        <CourseOutline />
      </div>
    </>
  );
}
