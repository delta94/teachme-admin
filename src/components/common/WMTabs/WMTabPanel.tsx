import React, { ReactNode } from 'react';
import { Tabs } from 'antd';
import { TabPaneProps } from 'antd/lib/tabs';
import cc from 'classcat';

import classes from './style.module.scss';

export interface IWMTabPanel extends TabPaneProps {
  className?: string;
  children: ReactNode;
}

const { TabPane } = Tabs;

export default function WMTabPanel({ className, children, ...otherProps }: IWMTabPanel) {
  return (
    <TabPane className={cc([classes['wm-tab-panel'], className])} {...otherProps}>
      {children}
    </TabPane>
  );
}
