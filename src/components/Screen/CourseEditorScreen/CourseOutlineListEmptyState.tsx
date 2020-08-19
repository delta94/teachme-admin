import React, { ReactElement } from 'react';

import WMEmpty from '../../common/WMEmpty';
import Icon, { IconType } from '../../common/Icon';

import CourseOutlineActionMenu from './CourseOutlineActionMenu';

export default function CourseOutlineListEmptyState({
  className,
  containerClassName,
}: {
  className?: string;
  containerClassName?: string;
}): ReactElement {
  return (
    <WMEmpty
      description="Start building your course by creating lessons and dragging items from the Items List"
      image={<Icon type={IconType.EmptyCourse} />}
      className={className}
      containerClassName={containerClassName}
    >
      <CourseOutlineActionMenu />
    </WMEmpty>
  );
}
