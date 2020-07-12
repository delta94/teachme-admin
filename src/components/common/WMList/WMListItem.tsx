import React, { ReactNode, ReactElement } from 'react';
import cc from 'classcat';
import { List } from 'antd';
import { ListItemProps } from 'antd/lib/list/Item';

import classes from './style.module.scss';

export interface IWMListItemProps extends ListItemProps {
  className?: string;
  icon?: ReactNode;
  children: ReactNode;
}

export default function WMListItem({
  className = '',
  icon,
  children,
  ...otherProps
}: IWMListItemProps): ReactElement {
  return (
    <List.Item
      className={cc([
        classes['wm-list-item'],
        className,
        { [classes['item-icon']]: Boolean(icon) },
      ])}
      {...otherProps}
    >
      {icon}
      {children}
    </List.Item>
  );
}
