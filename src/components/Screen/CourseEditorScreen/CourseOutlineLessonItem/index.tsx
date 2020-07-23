import React, { ReactElement } from 'react';
import { Draggable } from 'react-smooth-dnd';
import cc from 'classcat';

import { CourseLesson } from '../../../../walkme/data/courseBuild/courseItems/lesson';
import { useCourseEditorContext, ActionType } from '../../../../providers/CourseEditorContext';

import WMCollapse from '../../../common/WMCollapse';
import { IconType } from '../../../common/Icon';

import CourseItemsList from '../CourseItemsList';
import LessonHeader from '../LessonHeader';

import classes from './style.module.scss';

export interface INewLesson extends CourseLesson {
  isNew?: boolean;
}

export default function CourseOutlineLessonItem({
  item,
  className,
}: {
  item: INewLesson;
  className: string;
}): ReactElement {
  const [state, dispatch] = useCourseEditorContext();

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

    dispatch({ type: ActionType.UpdateCourseOutline });
  };

  const shouldAcceptDrop = (e: any, payload: any) => payload.type !== 'lesson' && !payload.answers;

  return (
    <Draggable className={cc([classes['course-outline-lesson-item'], className])}>
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
