import React, { ReactElement, ReactNode } from 'react';
import cc from 'classcat';

import WMCollapse, { IWMCollapse } from '../WMCollapse';
import WMCollapsePanel from '../WMCollapse/WMCollapsePanel';

import WMList, { IWMListProps } from './WMList';
import WMListItem from './WMListItem';
import classes from './style.module.scss';
import Header from '../Header';

export enum CollapsibleContentType {
  Default = 'default',
  WMList = 'wm-list',
}

export interface IWMCollapsibleListItem {
  header: { children: ReactNode; icon?: ReactNode };
  key: string;
  children: ReactNode;
  icon?: ReactNode;
}

export interface IWMCollapsibleList<T> extends Omit<IWMListProps<T>, 'dataSource'> {
  className?: string;
  items: Array<T>;
  wmCollapseProps?: IWMCollapse;
  contentType?: CollapsibleContentType;
}

export default function WMCollapsibleList<T>({
  className = '',
  items,
  wmCollapseProps,
  contentType = CollapsibleContentType.Default,
  ...otherProps
}: IWMCollapsibleList<T & IWMCollapsibleListItem>): ReactElement {
  return (
    <WMList
      className={cc([
        classes['wm-collapsible-list'],
        classes[`${contentType}-collapsible-content`],
        className,
      ])}
      dataSource={items}
      renderItem={(item) => (
        <WMCollapse {...wmCollapseProps}>
          <WMCollapsePanel
            header={
              <Header
                className={cc([
                  classes['header'],
                  { [classes['header-icon']]: Boolean(item.header.icon) },
                ])}
              >
                {item.header.icon}
                {item.header.children}
              </Header>
            }
            key={item.key}
          >
            <div className={classes[`${contentType}-content`]}>
              {item.icon}
              {item.children}
            </div>
          </WMCollapsePanel>
        </WMCollapse>
      )}
      {...otherProps}
    />
  );
}
