import React, { ReactElement } from 'react';
import { Empty } from 'antd';

import classes from './style.module.scss';

export default function DataEmptyState(): ReactElement {
  return (
    <div className={classes['data-empty-state']}>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    </div>
  );
}
