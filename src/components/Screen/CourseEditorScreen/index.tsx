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
import UnloadDialog from '../../common/UnloadDialog';

import ResourcesList from './ResourcesList';
import CourseOutline from './CourseOutline';
import HeaderConfirmationButtons from './HeaderConfirmationButtons';
import classes from './style.module.scss';

export default function CourseEditorScreen(): ReactElement {
  const [{ course, isFetchingCourse, hasChanges }, dispatch] = useCourseEditorContext();
  const { courseId } = useParams();

  useEffect(() => {
    fetchItemsList(dispatch);
    fetchCourse(dispatch, courseId);

    return () => dispatch({ type: ActionType.ResetCourseEditor });
  }, [dispatch, courseId]);

  const onCourseTitleBlur = (courseTitle: string) => {
    if (course) {
      course.title = courseTitle;
    }

    dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
  };

  return (
    <>
      <ScreenHeader
        title={
          <EditableTitle
            isNew={!courseId}
            isLoading={isFetchingCourse}
            value={course?.title ?? ''}
            onBlur={onCourseTitleBlur}
          />
        }
        hideTimeFilter={true}
      >
        <HeaderConfirmationButtons />
      </ScreenHeader>
      <div className={classes['cards-wrapper']}>
        <ResourcesList />
        <CourseOutline />
      </div>
      <UnloadDialog when={hasChanges} />
    </>
  );
}
