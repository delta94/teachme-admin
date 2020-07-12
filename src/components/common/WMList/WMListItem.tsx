import React, { ReactNode, ReactElement } from 'react';
import cc from 'classcat';
import { List } from 'antd';
import { ListItemProps } from 'antd/lib/list/Item';

import classes from './style.module.scss';

export interface IWMListItemProps extends ListItemProps {
  className?: string;
  children: ReactNode;
}

export default function WMListItem({
  className,
  children,
  ...otherProps
}: IWMListItemProps): ReactElement {
  return (
    <List.Item className={cc([classes['wm-list-item'], className])} {...otherProps}>
      {children}
    </List.Item>
  );
}
