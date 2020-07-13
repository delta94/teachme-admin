import React, { ReactElement, ReactNode } from 'react';
import { WMList, WMListItem } from '../WMList';
import { IWMListProps } from '../WMList/WMList';

export interface ICourseItem {
  text: string;
  icon: ReactNode;
}

export interface ICourseItemsList<T> extends IWMListProps<T> {
  items: ICourseItem[];
}

export default function CourseItemsList<T extends {}>({
  items,
}: ICourseItemsList<T>): ReactElement {
  return (
    <WMList
      dataSource={items}
      renderItem={(item: ICourseItem) => <WMListItem icon={item.icon}>{item.text}</WMListItem>}
    />
  );
}
