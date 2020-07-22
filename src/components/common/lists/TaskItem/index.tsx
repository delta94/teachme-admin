import React, { ReactElement } from 'react';
import { Draggable } from 'react-smooth-dnd';
import { ContentItem } from '@walkme/types';
import cc from 'classcat';

import Icon from '../../Icon';

import classes from './style.module.scss';

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
        <Icon type={type} className={classes['icon']} />
        <span className={classes['item-title']}>{title}</span>
      </div>
    </Draggable>
  );
}