import React, { ReactElement } from 'react';
import { ContentItem } from '@walkme/types';
import cc from 'classcat';

import { CourseItemType } from '../../../../interfaces/course.interfaces';
import WMList, { WMListItem, IWMList } from '../../WMList';
import Icon from '../../Icon';

import CourseOutlineLessonItem from './CourseOutlineLessonItem';

import classes from './style.module.scss';

export { CourseOutlineLessonItem };

export interface ICourseOutlineItem extends ContentItem {
  isNew?: boolean;
  localId?: string;
}

export interface ICourseOutlineList<T> extends IWMList<T> {
  items: ICourseOutlineItem[];
  onItemChange: (item: ICourseOutlineItem) => void;
}

export default function CourseOutlineList<T>({
  items,
  onItemChange,
}: ICourseOutlineList<T>): ReactElement {
  const renderCourseOutlineItem = (item: ICourseOutlineItem): ReactElement => {
    const { type, title, childNodes } = item;

    if (type === CourseItemType.Lesson && childNodes) {
      return (
        <WMListItem className={cc([classes['course-item'], classes['lesson-item']])}>
          <CourseOutlineLessonItem onChange={onItemChange} item={item} />
        </WMListItem>
      );
    }

    return (
      <WMListItem className={classes['course-item']} icon={<Icon type={type} />}>
        {title}
      </WMListItem>
    );
  };

  return (
    <WMList
      className={classes['course-outline-list']}
      dataSource={items}
      renderItem={(item: ICourseOutlineItem) => renderCourseOutlineItem(item)}
    />
  );
}
