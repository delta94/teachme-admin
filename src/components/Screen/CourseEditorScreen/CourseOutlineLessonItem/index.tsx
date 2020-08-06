import React, { ReactElement, useEffect, useRef } from 'react';
import { Draggable } from 'react-smooth-dnd';
import cc from 'classcat';

import { CourseLesson } from '../../../../walkme/data/courseBuild/courseItems/lesson';
import { useCourseEditorContext, ActionType } from '../../../../providers/CourseEditorContext';

import WMCollapse from '../../../common/WMCollapse';
import Icon, { IconType } from '../../../common/Icon';
import WMEmpty from '../../../common/WMEmpty';

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
  innerClassName,
  id,
}: {
  item: INewLesson;
  index: number;
  className?: string;
  innerClassName?: string;
  id: number;
}): ReactElement {
  const [{ course, activeDetailsItem }, dispatch] = useCourseEditorContext();
  const newLessonRef = useRef<HTMLDivElement>(null);

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
    const shouldResetActiveDetailsPanel = activeDetailsItem?.id === item.id;
    (course?.items.getItem(index) as CourseLesson).childNodes.removeItem(item);

    dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });

    // on delete activeDetailsItem should close the details panel
    if (shouldResetActiveDetailsPanel) dispatch({ type: ActionType.CloseDetailsPanel });
  };

  const isEmpty = !item.childNodes.toArray().length;

  useEffect(() => {
    // detecting new lesson added and scroll to element
    if (id < 0 && isEmpty) {
      newLessonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [id, isEmpty]);

  return (
    <Draggable className={cc([classes['course-outline-lesson-item'], className])}>
      <WMCollapse
        className={cc([classes['lesson'], innerClassName])}
        contentClassName={cc({ [classes['is-empty']]: isEmpty })}
        headerClassName={classes['lesson-header']}
        header={<LessonHeader lesson={item} type={IconType.Lesson} />}
        hasDragHandle
      >
        {isEmpty && (
          <div ref={newLessonRef} className={classes['lesson-empty-state-wrapper']}>
            <WMEmpty
              description="Drag content into the lesson"
              image={<Icon type={IconType.EmptyLesson} />}
              containerClassName={classes['lesson-empty-state']}
            />
          </div>
        )}
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
          taskItemProps={{
            deletable: true,
            onDelete: onDeleteTaskItem,
            className: classes['task-with-settings'],
          }}
          isActive={(item: any) => item.id === activeDetailsItem?.id}
        />
      </WMCollapse>
    </Draggable>
  );
}
