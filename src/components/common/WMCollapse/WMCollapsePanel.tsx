import React, { ReactNode } from 'react';
import cc from 'classcat';
import { Collapse } from 'antd';
import { CollapsePanelProps } from 'antd/lib/collapse/CollapsePanel';

import classes from './style.module.scss';

const { Panel } = Collapse;

export interface IWMCollapsePanel extends CollapsePanelProps {
  className?: string;
  children: ReactNode;
}

export default function WMCollapsePanel({ className, children, ...otherProps }: IWMCollapsePanel) {
  return (
    <Collapse.Panel className={cc([classes['wm-collapse-panel'], className])} {...otherProps}>
      {children}
    </Collapse.Panel>
  );
}
