import React, { ReactElement } from 'react';

import WMEmpty from '../../common/WMEmpty';

import classes from './style.module.scss';

export default function ResourcesListEmptyState(): ReactElement {
  return (
    <WMEmpty
      description={
        <>
          <div>There are no items available.</div>
          <div>Create Walk-thrus and resources from the WalkMe Editor.</div>
        </>
      }
      className={classes['resource-list-empty-state']}
    />
  );
}
