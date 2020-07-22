import React, { ReactElement } from 'react';
import { Draggable } from 'react-smooth-dnd';
import { ContentItem } from '@walkme/types';
import cc from 'classcat';

import { CourseItemType } from '../../../../interfaces/course.interfaces';

import Icon, { IconType } from '../../../common/Icon';

import classes from './style.module.scss';

const iconType = {
  [CourseItemType.Lesson]: IconType.LessonSmall,
  [CourseItemType.SmartWalkThru]: IconType.SmartWalkthruSmall,
  [CourseItemType.Article]: IconType.ArticleSmall,
  [CourseItemType.Video]: IconType.VideoSmall,
};

export interface ITaskItem {
  item: ContentItem;
  index: number;
  className?: string;
  [key: string]: any;
}

export default function TaskItem({
  item: { title, type },
  index,
  className,
  ...otherProps
}: ITaskItem): ReactElement {
  return (
    <Draggable key={index} className={cc([classes['task-item'], className])} {...otherProps}>
      <div key={index} className={classes['item']}>
        <Icon type={iconType[type as keyof typeof iconType]} className={classes['icon']} />
        <span className={classes['title']}>{title}</span>
      </div>
    </Draggable>
  );
}
