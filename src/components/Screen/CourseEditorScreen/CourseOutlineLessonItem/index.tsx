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
  index,
  className,
  handleItemClick,
}: {
  item: INewLesson;
  index: number;
  className: string;
  handleItemClick: (item: any) => void;
}): ReactElement {
  const [{ course }, dispatch] = useCourseEditorContext();

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

    if (isReorder || isAdd || isRemove) {
      dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
    }
  };

  const shouldAcceptDrop = (e: any, payload: any) => payload.type !== 'lesson' && !payload.answers;

  const onDeleteTaskItem = (item: any) => {
    (course?.items.getItem(index) as CourseLesson).childNodes.removeItem(item);
    dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
  };

  return (
    <Draggable className={cc([classes['course-outline-lesson-item'], className])}>
      <WMCollapse
        className={classes['lesson']}
        headerClassName={classes['lesson-header']}
        header={<LessonHeader lesson={item} type={IconType.Lesson} />}
        hasDragHandle
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
          handleItemClick={(item) => handleItemClick && handleItemClick(item)}
          taskItemProps={{ deletable: true, onDelete: onDeleteTaskItem }}
        />
      </WMCollapse>
    </Draggable>
  );
}
