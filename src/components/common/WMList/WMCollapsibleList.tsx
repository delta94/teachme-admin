import React, { ReactElement, ReactNode } from 'react';
import cc from 'classcat';

import WMCollapse, { IWMCollapse } from '../WMCollapse';
import WMCollapsePanel from '../WMCollapse/WMCollapsePanel';

import WMList, { IWMListProps } from './WMList';
import WMListItem from './WMListItem';
import classes from './style.module.scss';

export interface IWMCollapsibleListItem {
  header: ReactNode;
  key: string;
  children: ReactNode;
}

export interface IWMCollapsibleList<T> extends Omit<IWMListProps<T>, 'dataSource'> {
  className?: string;
  items: Array<T>;
  wmCollapseProps?: IWMCollapse;
}

export default function WMCollapsibleList<T>({
  className,
  items,
  wmCollapseProps,
  ...otherProps
}: IWMCollapsibleList<T & IWMCollapsibleListItem>): ReactElement {
  return (
    <WMList
      className={cc([classes['wm-collapsible-list'], className])}
      dataSource={items}
      renderItem={(item) => (
        <WMCollapse {...wmCollapseProps}>
          <WMCollapsePanel header={item.header} key={item.key}>
            <WMListItem>{item.children}</WMListItem>
          </WMCollapsePanel>
        </WMCollapse>
      )}
      {...otherProps}
    />
  );
}
