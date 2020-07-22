import React, { ReactElement } from 'react';

import WMEmpty from '../../WMEmpty';
import Icon, { IconType } from '../../Icon';
import AddButton from '../../buttons/AddButton';

import classes from './style.module.scss';

export default function CourseOutlineTabEmptyState(): ReactElement {
  return (
    <WMEmpty
      description="Start building your course by creating lessons and dragging items from the Items List"
      image={<Icon type={IconType.EmptyCourse} />}
      className={classes['course-outline-tab-empty-state']}
    >
      <AddButton />
    </WMEmpty>
  );
}
