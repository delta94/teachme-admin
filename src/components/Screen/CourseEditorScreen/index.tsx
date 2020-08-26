import React, { Dispatch, ReactElement, useCallback, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { WalkMeEnvironment } from '@walkme/editor-sdk/dist/environment';

import { useAppContext } from '../../../providers/AppContext';
import { Course } from '../../../walkme/data/courseBuild/course';
import {
  useCourseEditorContext,
  fetchItemsList,
  fetchCourse,
  ActionType,
} from '../../../providers/CourseEditorContext';

import EditableTitle from '../../common/EditableTitle';
import ScreenHeader from '../../common/ScreenHeader';
import UnloadDialog from '../../common/UnloadDialog';

import connectToContext from '../../../utils/connectToContext';
import ResourcesList from './ResourcesList';
import CourseOutline from './CourseOutline';
import HeaderConfirmationButtons from './HeaderConfirmationButtons';

import classes from './style.module.scss';

interface ICourseEditorScreenProps {
  course: Course;
  isFetchingCourse: boolean;
  hasChanges: boolean;
  isUpdating: boolean;
  isSavingCourse: boolean;
  environment: WalkMeEnvironment;
  dispatch: Dispatch<any>;
}

function CourseEditorScreen({
  course,
  isFetchingCourse,
  hasChanges,
  isUpdating,
  isSavingCourse,
  environment,
  dispatch,
}: ICourseEditorScreenProps): ReactElement {
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
        <HeaderConfirmationButtons
          course={course}
          hasChanges={hasChanges}
          isSavingCourse={isSavingCourse}
          environment={environment}
          dispatch={dispatch}
        />
      </ScreenHeader>
      <div className={classes['cards-wrapper']}>
        <ResourcesList />
        <CourseOutline />
      </div>
      <UnloadDialog when={hasChanges} />
    </div>
  );
}

const wrappedComponent = React.memo(CourseEditorScreen);

function select() {
  /* eslint-disable react-hooks/rules-of-hooks */
  const [
    { course, isFetchingCourse, hasChanges, isSavingCourse },
    dispatch,
  ] = useCourseEditorContext();
  const [{ isUpdating, environment }] = useAppContext();

  return {
    course,
    isFetchingCourse,
    hasChanges,
    isSavingCourse,
    isUpdating,
    environment,
    dispatch,
  };
}

export default connectToContext(wrappedComponent, select);
