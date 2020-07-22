import React, { ReactElement } from 'react';
import { Container } from 'react-smooth-dnd';
import { ContentItem } from '@walkme/types';
import cc from 'classcat';

import TaskItem from '../TaskItem';

import classes from './style.module.scss';

export interface ICourseItemsList {
  items: Array<ContentItem>;
  className?: string;
  onDrop?: any;
  [key: string]: any;
}

export default function CourseItemsList({
  items,
  onDrop,
  className,
  ...otherProps
}: ICourseItemsList): ReactElement {
  return (
    <div className={cc([classes['course-items-list'], className])}>
      <Container
        {...otherProps}
        getChildPayload={(i) => items && items[i]}
        onDrop={onDrop}
        dragClass={classes['card-ghost']}
      >
        {items && items.map((item, i) => <TaskItem key={i} index={i} item={item} />)}
      </Container>
    </div>
  );
}
