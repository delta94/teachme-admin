import React, { ReactElement, useCallback } from 'react';
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
  onClick?: (e: any, item: ContentItem) => void;
  deletable?: boolean;
  onDelete?: (item: any, index: number) => void;
  [key: string]: any;
}

function TaskItem({
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
  const deleteTask = useCallback(
    (e: any) => {
      e.stopPropagation();

      if (onDelete) {
        onDelete(item, index);
      }
    },
    [index, item, onDelete],
  );

  const onClickItem = useCallback(
    (e: any) => {
      if (onClick) {
        onClick(e, item);
      }
    },
    [item, onClick],
  );

  return (
    <Draggable
      key={index}
      className={cc([classes['task-item'], className, { [classes['active-item']]: active }])}
      {...otherProps}
    >
      <div key={index} className={cc([classes['item'], innerClassName])} onClick={onClickItem}>
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

export default React.memo(TaskItem);
