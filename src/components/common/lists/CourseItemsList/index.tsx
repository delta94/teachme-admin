import React, { ReactElement, ReactNode } from 'react';

import WMList, { WMListItem, IWMList } from '../../WMList';

import classes from './style.module.scss';

export interface ICourseItem {
  text: string;
  icon: ReactNode;
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
        <WMListItem className={classes['item']} icon={item.icon}>
          <span className={classes['item-text']}>{item.text}</span>
        </WMListItem>
      )}
      {...otherProps}
    />
  );
}
