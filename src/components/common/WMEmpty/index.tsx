import React, { ReactElement, ReactNode } from 'react';
import { Empty } from 'antd';
import { EmptyProps } from 'antd/lib/empty';
import cc from 'classcat';

import classes from './style.module.scss';

export default function WMEmpty({
  className,
  children,
  image = null,
  ...otherProps
}: EmptyProps): ReactElement {
  return (
    <div className={classes['wm-empty']}>
      <Empty
        className={cc([
          classes['empty-container'],
          { [classes['horizontal']]: !children },
          className,
        ])}
        image={image}
        {...otherProps}
      >
        {children}
      </Empty>
    </div>
  );
}
