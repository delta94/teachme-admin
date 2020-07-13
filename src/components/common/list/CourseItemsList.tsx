import React, { ReactElement, ReactNode } from 'react';
import WMList, { WMListItem, IWMList } from '../WMList';

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
      dataSource={items}
      renderItem={(item: T) => <WMListItem icon={item.icon}>{item.text}</WMListItem>}
      {...otherProps}
    />
  );
}
