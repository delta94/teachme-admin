import React, { ReactElement } from 'react';

import { CourseLesson } from '../../../walkme/data/courseBuild/courseItems/lesson';
import { CourseItemType } from '../../../interfaces/course.interfaces';
import { CourseTask } from '../../../walkme/data/courseBuild/courseItems/task';

import WMEmpty from '../../common/WMEmpty';
import Icon, { IconType } from '../../common/Icon';

import ActionMenu from './ActionMenu';

export default function CourseOutlineListEmptyState({
  className,
  containerClassName,
  onActionSelected,
}: {
  className?: string;
  containerClassName?: string;
  onActionSelected?: ({
    selectedType,
    item,
  }: {
    selectedType: CourseItemType;
    item?: CourseLesson | CourseTask;
  }) => void;
}): ReactElement {
  return (
    <WMEmpty
      description="Start building your course by creating lessons and dragging items from the Items List"
      image={<Icon type={IconType.EmptyCourse} />}
      className={className}
      containerClassName={containerClassName}
    >
      <ActionMenu onActionSelected={onActionSelected} />
    </WMEmpty>
  );
}
