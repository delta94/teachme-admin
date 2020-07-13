import React, { ReactElement } from 'react';
import cc from 'classcat';

import { WMList, WMListItem } from '../../WMList';
import { IWMListProps } from '../../WMList/WMList';
import Icon from '../../Icon';
import CourseOutlineLessonItem, { ICourseOutlineItem } from './CourseOutlineLessonItem';

import classes from './style.module.scss';

export interface ICourseOutlineList<T> extends IWMListProps<T> {
  items: ICourseOutlineItem[];
}

const renderCourseOutlineItem = (item: ICourseOutlineItem): ReactElement => {
  const { type, childNodes } = item;

  if (type === 'lesson' && childNodes && childNodes.length) {
    return (
      <WMListItem className={cc([classes['course-item'], classes['lesson-item']])}>
        <CourseOutlineLessonItem item={item} />
      </WMListItem>
    );
  } else {
    return (
      <WMListItem className={classes['course-item']} icon={<Icon type={type} />}>
        {item.title}
      </WMListItem>
    );
  }
};

export default function CourseOutlineList<T extends {}>({
  items,
}: ICourseOutlineList<T>): ReactElement {
  return (
    <WMList
      className={classes['course-outline-list']}
      dataSource={items}
      renderItem={(item: ICourseOutlineItem) => renderCourseOutlineItem(item)}
    />
  );
}
