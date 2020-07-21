import React, { ReactElement, ReactNode } from 'react';

import WMList, { WMListItem, IWMList } from '../../WMList';

import classes from './style.module.scss';

export interface ICourseItem {
  text: string;
  icon: ReactNode;
  onClick?: () => void;
}

export interface ICourseItemsList<T> extends Omit<IWMList<T>, 'dataSource' | 'renderItem'> {
  items: T[];
}

export default function CourseItemsList<T extends ICourseItem>({
  items,
  ...otherProps
}: ICourseItemsList<T>): ReactElement {
  return (
    <WMList
      className={classes['course-items-list']}
      dataSource={items}
      renderItem={(item: T) => (
        <WMListItem className={classes['item']} icon={item.icon} onClick={item.onClick}>
          <span className={classes['item-text']}>{item.text}</span>
        </WMListItem>
      )}
      {...otherProps}
    />
  );
}
