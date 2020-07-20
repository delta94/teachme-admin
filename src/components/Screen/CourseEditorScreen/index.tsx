import React, { ReactElement, useEffect } from 'react';

import {
  useCourseEditorContext,
  fetchItemsList,
  ActionType,
} from '../../../providers/CourseEditorContext';

import EditableTitle from '../../common/EditableTitle';
import ScreenHeader from '../../common/ScreenHeader';

import ResourcesList from './ResourcesList';
import CourseOutline from './CourseOutline';
import classes from './style.module.scss';

export default function CourseEditorScreen({ isNew = false }: { isNew?: boolean }): ReactElement {
  const [{ courseTitle }, dispatch] = useCourseEditorContext();

  useEffect(() => {
    fetchItemsList(dispatch);

    return () => dispatch({ type: ActionType.ResetCourseEditor });
  }, [dispatch]);

  const onCourseTitleBlur = (courseTitle: string) =>
    dispatch({ type: ActionType.SetCourseTitle, courseTitle });

  return (
    <>
      <ScreenHeader
        title={<EditableTitle onBlur={onCourseTitleBlur} value={courseTitle} isNew={isNew} />}
        hideTimeFilter={true}
      />
      <div className={classes['cards-wrapper']}>
        <ResourcesList />
        <CourseOutline />
      </div>
    </>
  );
}
