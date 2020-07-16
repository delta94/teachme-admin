import React, { ReactElement } from 'react';
import cc from 'classcat';

import { CourseItemType } from '../../../../interfaces/course.interfaces';
import WMList, { WMListItem, IWMList } from '../../WMList';
import Icon from '../../Icon';
import CourseOutlineLessonItem, { ICourseOutlineItem } from './CourseOutlineLessonItem';

import classes from './style.module.scss';

export interface ICourseOutlineList<T> extends IWMList<T> {
  items: ICourseOutlineItem[];
}

const renderCourseOutlineItem = (item: ICourseOutlineItem): ReactElement => {
  const { type, childNodes } = item;

  if (type === CourseItemType.Lesson && childNodes && childNodes.length) {
    return (
      <WMListItem className={cc([classes['course-item'], classes['lesson-item']])}>
        <CourseOutlineLessonItem item={item} />
      </WMListItem>
    );
  }

  return (
    <WMListItem className={classes['course-item']} icon={<Icon type={type} />}>
      {item.title}
    </WMListItem>
  );
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
