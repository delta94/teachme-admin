import React, { Dispatch, ReactElement, ReactNode } from 'react';
import { Container } from 'react-smooth-dnd';
import { ContentItem } from '@walkme/types';
import cc from 'classcat';

import { ActionType } from '../../../../providers/CourseEditorContext';
import { DetailsPanelSettingsType } from '../../../../providers/CourseEditorContext/course-editor-context.interface';

import TaskItem from '../TaskItem';

import classes from './style.module.scss';

export interface ICourseItemsList {
  items: Array<ContentItem>;
  className?: string;
  onDrop?: any;
  taskItemProps?: any;
  dispatch: Dispatch<any>;
  [key: string]: any;
}

function CourseItemsList({
  items,
  onDrop,
  className,
  taskItemProps = {},
  isDisabled,
  isActive,
  dispatch,
  ...otherProps
}: ICourseItemsList): ReactElement {
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

export default React.memo(CourseItemsList);
