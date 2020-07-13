import React, { ReactNode, ReactElement } from 'react';
import cc from 'classcat';
import { Collapse } from 'antd';
import { CollapseProps } from 'antd/lib/collapse/Collapse';

import classes from './style.module.scss';

export interface IWMCollapse extends CollapseProps {
  className?: string;
  children: ReactNode;
}

export default function WMCollapse({
  className = '',
  children,
  ...otherProps
}: IWMCollapse): ReactElement {
  return (
    <Collapse className={cc([classes['wm-collapse'], className])} {...otherProps}>
      {children}
    </Collapse>
  );
}
