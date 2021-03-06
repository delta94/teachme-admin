import React, { ReactElement } from 'react';
import { Container } from 'react-smooth-dnd';
import { ContentItem } from '@walkme/types';
import cc from 'classcat';

import { ActionType, useCourseEditorContext } from '../../../../providers/CourseEditorContext';
import { DetailsPanelSettingsType } from '../../../../providers/CourseEditorContext/course-editor-context.interface';

import TaskItem from '../TaskItem';

import classes from './style.module.scss';

export interface ICourseItemsList {
  items: Array<ContentItem>;
  className?: string;
  onDrop?: any;
  taskItemProps?: any;
  [key: string]: any;
}

export default function CourseItemsList({
  items,
  onDrop,
  className,
  taskItemProps = {},
  isDisabled,
  isActive,
  ...otherProps
}: ICourseItemsList): ReactElement {
  const [state, dispatch] = useCourseEditorContext();

  const onOpenDetailsPanel = (item: ContentItem) => {
    dispatch({
      type: ActionType.OpenDetailsPanel,
      activeDetailsItem: { type: DetailsPanelSettingsType.Item, id: item.id as number, item: item },
    });
  };

  return (
    <div className={cc([classes['course-items-list'], className])}>
      <Container
        {...otherProps}
        getChildPayload={(i) => items[i]}
        onDrop={onDrop}
        dragClass={classes['card-ghost']}
      >
        {Boolean(items.length) &&
          items.map((item, i) => {
            const disabled = isDisabled && isDisabled(item);
            const active = isActive && isActive(item);

            return (
              <TaskItem
                key={i}
                index={i}
                item={item}
                onClick={(e) => onOpenDetailsPanel(item)}
                active={active}
                disabled={disabled}
                {...taskItemProps}
              />
            );
          })}
      </Container>
    </div>
  );
}
