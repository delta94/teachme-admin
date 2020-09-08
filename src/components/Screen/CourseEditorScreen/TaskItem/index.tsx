import React, { ReactElement, useRef, useEffect, ReactNode } from 'react';
import { Draggable } from 'react-smooth-dnd';
import cc from 'classcat';

import { CourseTask } from '../../../../walkme/data/courseBuild/courseItems/task';
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
  item: CourseTask;
  index: number;
  className?: string;
  innerClassName?: string;
  onClick?: (e: any) => void;
  deletable?: boolean;
  onDelete?: (item: any, index: number) => void;
  newResourceId?: number;
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
  newResourceId,
  ...otherProps
}: ITaskItem): ReactElement {
  const resourceRef = useRef<HTMLDivElement>(null);
  const unsavedResourceLabel = item.linkedItem && !item.linkedItem.saved && (
    <span className={classes['label']}>- (UNSAVED)</span>
  );

  const deleteTask = (e: any) => {
    e.stopPropagation();

    if (onDelete) {
      onDelete(item, index);
    }
  };

  useEffect(() => {
    // detecting new resource added and scroll to element
    if (newResourceId && item.id === newResourceId) {
      resourceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [item.id, newResourceId]);

  return (
    <Draggable
      key={index}
      className={cc([classes['task-item'], className, { [classes['active-item']]: active }])}
      {...otherProps}
    >
      <div
        ref={resourceRef}
        key={index}
        className={cc([classes['item'], innerClassName])}
        onClick={onClick}
      >
        <DragHandle className={classes['task-item-drag-handle']} />
        <Icon type={iconType[type as keyof typeof iconType]} className={classes['icon']} />
        <span className={classes['title']}>
          {title} {unsavedResourceLabel}
        </span>
        {deletable && (
          <WMButton className={classes['delete-button']} onClick={deleteTask}>
            <Icon type={IconType.Remove} />
          </WMButton>
        )}
      </div>
    </Draggable>
  );
}
