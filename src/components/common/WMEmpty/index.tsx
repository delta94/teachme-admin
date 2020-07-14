import React, { ReactElement, ReactNode } from 'react';
import { Empty } from 'antd';
import { EmptyProps } from 'antd/lib/empty';
import cc from 'classcat';

import classes from './style.module.scss';

export interface IWMEmpty extends EmptyProps {
  children?: ReactNode;
}

export default function WMEmpty({ className, children, ...otherProps }: IWMEmpty): ReactElement {
  return (
    <Empty
      className={cc([classes['wm-empty'], { [classes['horizontal']]: !children }, className])}
      {...otherProps}
    >
      {children}
    </Empty>
  );
}
