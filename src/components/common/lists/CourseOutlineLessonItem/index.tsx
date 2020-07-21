import React, { ReactElement } from 'react';
import { Draggable } from 'react-smooth-dnd';

import { CourseLesson } from '../../../../walkme/course/mappers/course/courseItems/lesson';
import WMCollapse, { WMCollapsePanel } from '../../WMCollapse';
import Header from '../../Header';
import Icon, { IconType } from '../../Icon';
import { CourseItemsList } from '../index';

import classes from './style.module.scss';

export interface INewLesson extends CourseLesson {
  isNew?: boolean;
}

export default function Index({
  item,
  forceRerender,
}: {
  item: INewLesson;
  forceRerender: () => void;
}): ReactElement {
  const onInnerDrop = (e: any, destinationItemID: string | undefined, element: any) => {
    console.log('on inner drop', e, destinationItemID, element);

    const isAdd = e.addedIndex !== undefined && e.addedIndex !== null;
    const isRemove = e.removedIndex !== undefined && e.removedIndex !== null;
    const isReorder = isAdd && isRemove;

    if (isReorder) {
      item.childNodes.changeIndex(e.payload, e.addedIndex);
    } else if (isAdd) {
      item.childNodes.addNewItem(e.addedIndex, e.payload);
    } else if (isRemove) {
      item.childNodes.removeItem(e.payload);
    }

    forceRerender();
  };

  function shouldAcceptDrop(e: any, payload: any) {
    return payload.type !== 'lesson';
  }

  return (
    <Draggable className={classes['course-outline-list']}>
      <WMCollapse className={classes['lesson']}>
        <WMCollapsePanel
          header={
            <Header className={classes['lesson-header']}>
              <Icon type={IconType.Lesson} />
              {item.title}
            </Header>
          }
          key={item.id}
        >
          <CourseItemsList
            items={item.childNodes.toArray()}
            onDrop={(e: any) => onInnerDrop(e, item.id.toString(), e.element)}
            getChildPayload={(index: number) => item.childNodes?.toArray()[index]}
            dragClass="card-ghost"
            dropClass="card-ghost-drop"
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: classes['drop-preview'],
            }}
            shouldAcceptDrop={shouldAcceptDrop}
          />
        </WMCollapsePanel>
      </WMCollapse>
    </Draggable>
  );
}
