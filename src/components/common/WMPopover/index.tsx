import React from 'react';
import { Popover } from 'antd';

import classes from './style.module.scss';

export default function WMPopover({
  content,
  children,
  ...otherProps
}: {
  content: React.ReactElement | string;
  children: React.ReactElement;
}): React.ReactElement {
  return (
    <Popover overlayClassName={classes['wm-popover']} content={content} {...otherProps}>
      {children}
    </Popover>
  );
}
