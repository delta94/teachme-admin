import React, { ReactNode } from 'react';
import cc from 'classcat';
import { Collapse } from 'antd';
import { CollapseProps } from 'antd/lib/collapse/Collapse';

import classes from './style.module.scss';

export enum CollapseType {
  Default = 'default',
  WMList = 'wm-list',
}

export interface IWMCollapse extends CollapseProps {
  className?: string;
  collapseType?: CollapseType;
  children: ReactNode;
}

export default function WMCollapse({
  className = '',
  collapseType = CollapseType.Default,
  children,
  ...otherProps
}: IWMCollapse) {
  return (
    <Collapse
      className={cc([classes['wm-collapse'], classes[collapseType], className])}
      {...otherProps}
    >
      {children}
    </Collapse>
  );
}
