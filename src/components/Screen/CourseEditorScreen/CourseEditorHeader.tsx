import React, { Dispatch, ReactElement } from 'react';
import isEqual from 'lodash/isEqual';

import { WalkMeEnvironment } from '@walkme/editor-sdk';
import EditableTitle from '../../common/EditableTitle';
import ScreenHeader from '../../common/ScreenHeader';

import { Course } from '../../../walkme/data/courseBuild/course';
import HeaderConfirmationButtons from './HeaderConfirmationButtons';

export interface ICourseEditorHeaderProps {
  course: Course | null;
  courseId: number;
  isValid: boolean;
  isFetchingCourse: boolean;
  hasChanges: boolean;
  isSavingCourse: boolean;
  environment: WalkMeEnvironment;
  onCourseTitleBlur: (courseTitle: string) => void;
  dispatch: Dispatch<any>;
}

function CourseEditorHeader({
  course,
  courseId,
  isValid,
  isFetchingCourse,
  hasChanges,
  isSavingCourse,
  environment,
  onCourseTitleBlur,
  dispatch,
}: ICourseEditorHeaderProps): ReactElement {
  return (
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
        isValid={isValid}
        hasChanges={hasChanges}
        isSavingCourse={isSavingCourse}
        dispatch={dispatch}
        environment={environment}
      />
    </ScreenHeader>
  );
}

export default React.memo(CourseEditorHeader, (oldProps, newProps) => isEqual(oldProps, newProps));
