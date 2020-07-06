import React, { ReactNode } from 'react';
import { Tabs } from 'antd';
import { TabsProps } from 'antd/lib/tabs';
import cc from 'classcat';

import classes from './style.module.scss';

export interface IWMTabs extends TabsProps {
  className?: string;
  children: ReactNode;
}

export default function WMTabs({ className, children, ...otherProps }: IWMTabs) {
  return (
    <Tabs className={cc([classes['wm-tabs'], className])} {...otherProps}>
      {children}
    </Tabs>
  );
}
