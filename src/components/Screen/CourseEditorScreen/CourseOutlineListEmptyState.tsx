import React, { Dispatch, ReactElement } from 'react';

import { CourseItemType } from '../../../interfaces/course.interfaces';

import WMEmpty from '../../common/WMEmpty';
import Icon, { IconType } from '../../common/Icon';

import { Course } from '../../../walkme/data/courseBuild/course';
import { Quiz } from '../../../walkme/data/courseBuild/quiz';
import ActionMenu from './ActionMenu';

export default function CourseOutlineListEmptyState({
  className,
  containerClassName,
  onActionSelected,
  course,
  quiz,
  dispatch,
}: {
  className?: string;
  containerClassName?: string;
  onActionSelected?: (selected: CourseItemType, lessonId?: number | undefined) => void;
  course: Course | null;
  quiz: Quiz | null;
  dispatch: Dispatch<any>;
}): ReactElement {
  return (
    <WMEmpty
      description="Start building your course by creating lessons and dragging items from the Items List"
      image={<Icon type={IconType.EmptyCourse} />}
      className={className}
      containerClassName={containerClassName}
    >
      <ActionMenu
        onActionSelected={onActionSelected}
        course={course}
        quiz={quiz}
        dispatch={dispatch}
      />
    </WMEmpty>
  );
}
