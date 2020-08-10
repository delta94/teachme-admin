import React, { ReactElement, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { useAppContext } from '../../../providers/AppContext';
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
  const [{ environment }] = useAppContext();
  const { courseId } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetchItemsList(dispatch);
    fetchCourse(dispatch, courseId, environment.id, history);

    return () => dispatch({ type: ActionType.ResetCourseEditor });
  }, [dispatch, courseId, environment.id, history]);

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
