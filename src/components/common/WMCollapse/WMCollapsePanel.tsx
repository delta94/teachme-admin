import React, { ReactElement, ReactNode } from 'react';
import cc from 'classcat';
import { Collapse } from 'antd';
import { CollapsePanelProps } from 'antd/lib/collapse';

import classes from './style.module.scss';

export interface IWMCollapsePanel extends CollapsePanelProps {
  className?: string;
  children: ReactNode;
}

const { Panel } = Collapse;

export default function WMCollapsePanel({
  className = '',
  children,
  ...otherProps
}: IWMCollapsePanel): ReactElement {
  return (
    <Panel className={cc([classes['wm-collapse-panel'], className])} {...otherProps}>
      {children}
    </Panel>
  );
}
