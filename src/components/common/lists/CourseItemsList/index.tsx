import React, { ReactElement, ReactNode } from 'react';
import cc from 'classcat';

import { Container, Draggable } from 'react-smooth-dnd';
import { ContentItem } from '@walkme/types';
import Icon, { IconType } from '../../Icon';

import classes from './style.module.scss';

export interface ICourseItemsList {
  items: Array<ContentItem>;
  className?: string;
  [key: string]: any;
}

const ItemIcon = {
  smartwalkthru: IconType.SmartWalkthruSmall,
  article: IconType.ArticleSmall,
  video: IconType.VideoSmall,
};

export default function CourseItemsList({
  items,
  className,
  ...otherProps
}: ICourseItemsList): ReactElement {
  return (
    <div className={cc([classes['course-items-list'], className])}>
      <Container {...otherProps} getChildPayload={(i) => items && items[i]}>
        {items &&
          items.map(({ title, type }, i) => (
            <Draggable
              key={i}
              className={cc([classes['item-wrapper'], { [classes['disabled']]: i % 2 === 0 }])}
            >
              <div key={i} className={classes['item']}>
                <Icon type={ItemIcon[type as keyof typeof ItemIcon]} className={classes['icon']} />
                <span className={classes['item-title']}>{title}</span>
              </div>
            </Draggable>
          ))}
      </Container>
    </div>
  );
}
