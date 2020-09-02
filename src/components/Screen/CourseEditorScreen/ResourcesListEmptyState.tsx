import React, { ReactElement } from 'react';

import WMEmpty from '../../common/WMEmpty';

import classes from './style.module.scss';

export default function ResourcesListEmptyState(): ReactElement {
  return (
    <WMEmpty
      description={
        <>
          <span>There are no items available.</span>
          <span>Create Walk-thrus and resources from the WalkMe Editor.</span>
        </>
      }
      className={classes['resource-list-empty-state']}
    />
  );
}
