import React, { ReactNode, ReactElement } from 'react';
import cc from 'classcat';
import { ListProps } from 'antd/lib/list';
import { List } from 'antd';

import classes from './style.module.scss';

export interface IWMCardProps<T> extends ListProps<T> {
  className: string;
  children: ReactNode;
}

export default function WMList<T>({
  children,
  className,
  ...otherProps
}: ListProps<T>): ReactElement {
  return (
    <List className={cc([classes['wm-list'], className])} {...otherProps}>
      {children}
    </List>
  );
}
