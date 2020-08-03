import React, { ReactNode, ReactElement } from 'react';
import { Tabs } from 'antd';
import { TabsProps } from 'antd/lib/tabs';
import cc from 'classcat';

import WMTabPanel, { IWMTabPanel } from './WMTabPanel';
import classes from './style.module.scss';

export { WMTabPanel };
export type { IWMTabPanel };

export interface IWMTabs extends TabsProps {
  className?: string;
  onTabClick?: (activeKey: string, e: React.KeyboardEvent | React.MouseEvent) => void;
  children: ReactNode;
}

export default function WMTabs({
  className,
  onTabClick,
  children,
  ...otherProps
}: IWMTabs): ReactElement {
  return (
    <Tabs className={cc([classes['wm-tabs'], className])} {...otherProps} onTabClick={onTabClick}>
      {children}
    </Tabs>
  );
}
