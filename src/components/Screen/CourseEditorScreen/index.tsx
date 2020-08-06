import React, { ReactElement, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import usePrevious from '@react-hook/previous';

import {
  useCourseEditorContext,
  fetchItemsList,
  fetchCourse,
  ActionType,
} from '../../../providers/CourseEditorContext';
import { useAppContext } from '../../../providers/AppContext';
import { COURSES_ROUTE } from '../../../constants/routes';

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

  const [{ system }] = useAppContext();
  const prevSystem = usePrevious(system);
  const { push } = useHistory();

  useEffect(() => {
    if (prevSystem && prevSystem.userId !== system.userId) push(COURSES_ROUTE.path);
  }, [prevSystem, system, push]);

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
