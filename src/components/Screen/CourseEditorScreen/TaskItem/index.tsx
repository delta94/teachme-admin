import React, { ReactElement } from 'react';
import { Draggable } from 'react-smooth-dnd';
import { ContentItem } from '@walkme/types';
import cc from 'classcat';

import { CourseItemType } from '../../../../interfaces/course.interfaces';

import Icon, { IconType } from '../../../common/Icon';
import WMButton from '../../../common/WMButton';
import DragHandle from '../../../common/DragHandle/DragHandle';

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
  innerClassName?: string;
  onClick?: (e: any) => void;
  deletable?: boolean;
  onDelete?: (item: any, index: number) => void;
  [key: string]: any;
}

export default function TaskItem({
  item,
  item: { title, type },
  index,
  className,
  innerClassName,
  onClick,
  deletable = false,
  active = false,
  onDelete,
  ...otherProps
}: ITaskItem): ReactElement {
  const deleteTask = (e: any) => {
    e.stopPropagation();

    if (onDelete) {
      onDelete(item, index);
    }
  };

  return (
    <Draggable
      key={index}
      className={cc([classes['task-item'], className, { [classes['active-item']]: active }])}
      {...otherProps}
    >
      <div key={index} className={cc([classes['item'], innerClassName])} onClick={onClick}>
        <DragHandle className={classes['task-item-drag-handle']} />
        <Icon type={iconType[type as keyof typeof iconType]} className={classes['icon']} />
        <span className={classes['title']}>{title}</span>
        {deletable && (
          <WMButton className={classes['delete-button']} onClick={deleteTask}>
            <Icon type={IconType.Remove} />
          </WMButton>
        )}
      </div>
    </Draggable>
  );
}
