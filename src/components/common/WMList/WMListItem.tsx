import React, { ReactNode, ReactElement } from 'react';
import cc from 'classcat';
import { List } from 'antd';
import { ListItemProps } from 'antd/lib/list/Item';

import classes from './style.module.scss';

export interface IWMListItem extends ListItemProps {
  className?: string;
  icon?: ReactNode;
  children: ReactNode;
}

export default function WMListItem({
  className,
  icon,
  children,
  ...otherProps
}: IWMListItem): ReactElement {
  return (
    <List.Item
      className={cc([
        classes['wm-list-item'],
        className,
        { [classes['wm-list-item-icon']]: Boolean(icon) },
      ])}
      {...otherProps}
    >
      {icon}
      {children}
    </List.Item>
  );
}
