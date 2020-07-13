import React, { ReactElement } from 'react';
import cc from 'classcat';
import { ListProps } from 'antd/lib/list';
import { List } from 'antd';

import WMListItem, { IWMListItem } from './WMListItem';

import classes from './style.module.scss';

interface IWMList<T> extends ListProps<T> {
  className?: string;
}

export default function WMList<T>({ className = '', ...otherProps }: IWMList<T>): ReactElement {
  return <List className={cc([classes['wm-list'], className])} {...otherProps} />;
}

export { WMListItem };
export type { IWMList, IWMListItem };
