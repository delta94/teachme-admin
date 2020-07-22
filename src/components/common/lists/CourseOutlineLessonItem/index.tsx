import React, { ReactElement } from 'react';
import { Draggable } from 'react-smooth-dnd';
import cc from 'classcat';

import { CourseLesson } from '../../../../walkme/course/mappers/course/courseItems/lesson';
import WMCollapse from '../../WMCollapse';
import { IconType } from '../../Icon';
import { CourseItemsList } from '../index';

import LessonHeader from '../LessonHeader';
import classes from './style.module.scss';

export interface INewLesson extends CourseLesson {
  isNew?: boolean;
}

export default function CourseOutlineLessonItem({
  item,
  className,
  forceRerender,
}: {
  item: INewLesson;
  className: string;
  forceRerender: () => void;
}): ReactElement {
  const onInnerDrop = (e: any, destinationItemID: string | undefined, element: any) => {
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
    <Draggable className={cc([classes['course-outline-list'], className])}>
      <WMCollapse
        className={classes['lesson']}
        headerClassName={classes['lesson-header']}
        header={<LessonHeader title={item.title} type={IconType.Lesson} />}
      >
        <CourseItemsList
          items={item.childNodes.toArray()}
          onDrop={(e: any) => onInnerDrop(e, item.id.toString(), e.element)}
          getChildPayload={(index: number) => item.childNodes?.toArray()[index]}
          dragClass={classes['card-ghost']}
          dropClass={classes['card-ghost-drop']}
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: false,
            className: classes['drop-preview'],
          }}
          shouldAcceptDrop={shouldAcceptDrop}
          className={cc([{ [classes['is-empty']]: !item.childNodes.toArray().length }])}
        />
      </WMCollapse>
    </Draggable>
  );
}
