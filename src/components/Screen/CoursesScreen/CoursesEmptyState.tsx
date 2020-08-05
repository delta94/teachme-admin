import React, { ReactElement } from 'react';

import { CreateButton } from '../../common/buttons';
import Icon, { IconType } from '../../common/Icon';
import WMSkeleton from '../../common/WMSkeleton';

import classes from './style.module.scss';

export default function CoursesEmptyState({
  isLoading = false,
}: {
  isLoading?: boolean;
}): ReactElement {
  return (
    <WMSkeleton loading={isLoading} active paragraph={{ rows: 10 }}>
      <div className={classes['courses-empty-state']}>
        <Icon className={classes['icon']} type={IconType.EmptyCourse} />
        <h1>No courses yet</h1>
        <p>Start creating courses by clicking the button below</p>
        <CreateButton />
      </div>
    </WMSkeleton>
  );
}
