import React, { ReactElement } from 'react';

import WMEmpty from '../../common/WMEmpty';
import Icon, { IconType } from '../../common/Icon';

import ActionMenu from './ActionMenu';

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
      <ActionMenu />
    </WMEmpty>
  );
}
