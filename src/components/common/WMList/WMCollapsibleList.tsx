import React, { ReactElement } from 'react';
import cc from 'classcat';
import { ListItemProps } from 'antd/lib/list/Item';

import WMCollapse, { IWMCollapse } from '../WMCollapse';
import WMCollapsePanel, { IWMCollapsePanel } from '../WMCollapse/WMCollapsePanel';

import WMList from './WMList';
import WMListItem from './WMListItem';
import classes from './style.module.scss';

export interface IWMCollapsibleList extends ListItemProps {
  className?: string;
  items: IWMCollapsePanel[];
  wmCollapseProps?: IWMCollapse;
}

export default function WMCollapsibleList({
  className,
  items,
  wmCollapseProps,
  ...otherProps
}: IWMCollapsibleList): ReactElement {
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
