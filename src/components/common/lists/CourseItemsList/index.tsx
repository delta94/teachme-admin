import React, { ReactElement, ReactNode } from 'react';
import { Container } from 'react-smooth-dnd';

import { ContentItem } from '@walkme/types';
import cc from 'classcat';

import TaskItem from '../TaskItem';

import classes from './style.module.scss';

export interface ICourseItemsList {
  items: Array<ContentItem>;
  className?: string;
  onDrop?: any;
  emptyState?: ReactNode;
  [key: string]: any;
  handleItemClick?: (item: ContentItem) => void;
}

export default function CourseItemsList({
  items,
  onDrop,
  className,
  handleItemClick,
  emptyState,
  ...otherProps
}: ICourseItemsList): ReactElement {
  const localEmptyState = emptyState ?? <div>No items were found</div>;

  return (
    <div className={cc([classes['course-items-list'], className])}>
      <Container
        {...otherProps}
        getChildPayload={(i) => items[i]}
        onDrop={onDrop}
        dragClass={classes['card-ghost']}
      >
        {items.length
          ? items.map((item, i) => (
              <TaskItem
                key={i}
                index={i}
                item={item}
                onClick={() => handleItemClick && handleItemClick(item)}
              />
            ))
          : localEmptyState}
      </Container>
    </div>
  );
}
