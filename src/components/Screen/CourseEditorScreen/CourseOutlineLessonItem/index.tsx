import React, { Dispatch, ReactElement, useCallback, useEffect, useMemo, useRef } from 'react';
import { Draggable } from 'react-smooth-dnd';
import cc from 'classcat';

import { CourseLesson } from '../../../../walkme/data/courseBuild/courseItems/lesson';
import { ActionType } from '../../../../providers/CourseEditorContext';

import WMCollapse from '../../../common/WMCollapse';
import Icon, { IconType } from '../../../common/Icon';
import WMEmpty from '../../../common/WMEmpty';

import CourseItemsList from '../CourseItemsList';
import LessonHeader from '../LessonHeader';

import { ActiveDetailsItem } from '../../../../providers/CourseEditorContext/course-editor-context.interface';
import { Course } from '../../../../walkme/data/courseBuild/course';
import classes from './style.module.scss';

export interface INewLesson extends CourseLesson {
  isNew?: boolean;
}

export default function CourseOutlineLessonItem({
  item,
  index,
  className,
  innerClassName,
  newLessonId,
  course,
  activeDetailsItem,
  dispatch,
}: {
  item: INewLesson;
  index: number;
  className?: string;
  innerClassName?: string;
  newLessonId?: number;
  course: Course | null;
  activeDetailsItem: ActiveDetailsItem | null;
  dispatch: Dispatch<any>;
}): ReactElement {
  const lessonRef = useRef<HTMLDivElement>(null);

  const onInnerDrop = useCallback(
    (e: any, destinationItemID: string | undefined, element: any) => {
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
    },
    [dispatch, item.childNodes],
  );

  const shouldAcceptDrop = useCallback(
    (e: any, payload: any) => payload.type !== 'lesson' && !payload.answers,
    [],
  );

  const onChildDrop = useCallback((e: any) => onInnerDrop(e, e.payload.id.toString(), e.element), [
    onInnerDrop,
  ]);

  const getChildPayload = useCallback((index: number) => item.childNodes?.toArray()[index], [
    item.childNodes?.toArray,
  ]);

  const dropPlaceholder = useMemo(
    () => ({
      animationDuration: 150,
      showOnTop: false,
      className: classes['drop-preview'],
    }),
    [],
  );

  const onDeleteTaskItem = useCallback(
    (item: any) => {
      const shouldResetActiveDetailsPanel = activeDetailsItem?.id === item.id;
      (course?.items.getItem(index) as CourseLesson).childNodes.removeItem(item);

      dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
      // on delete activeDetailsItem should close the details panel
      if (shouldResetActiveDetailsPanel) dispatch({ type: ActionType.CloseDetailsPanel });
    },
    [activeDetailsItem?.id, course?.items?.getItem, dispatch, index],
  );

  const taskItemProps = useMemo(
    () => ({
      deletable: true,
      onDelete: onDeleteTaskItem,
      className: classes['task-with-settings'],
    }),
    [onDeleteTaskItem],
  );

  const isActive = useCallback((item: any) => item.id === activeDetailsItem?.id, [
    activeDetailsItem?.id,
  ]);

  const isEmpty = !item.childNodes.toArray().length;

  useEffect(() => {
    // detecting new lesson added and scroll to element
    if (item.id === newLessonId && isEmpty) {
      lessonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [item.id, isEmpty, newLessonId]);

  return (
    <Draggable className={cc([classes['course-outline-lesson-item'], className])}>
      <WMCollapse
        className={cc([classes['lesson'], innerClassName])}
        contentClassName={cc({ [classes['is-empty']]: isEmpty })}
        headerClassName={classes['lesson-header']}
        header={
          <LessonHeader lesson={item} course={course} type={IconType.Lesson} dispatch={dispatch} />
        }
        hasDragHandle
        ref={lessonRef}
      >
        {isEmpty && (
          <div className={classes['lesson-empty-state-wrapper']}>
            <WMEmpty
              description="Drag content into the lesson"
              image={<Icon type={IconType.EmptyLesson} />}
              containerClassName={classes['lesson-empty-state']}
            />
          </div>
        )}
        <CourseItemsList
          items={item.childNodes.toArray()}
          onDrop={onChildDrop}
          getChildPayload={getChildPayload}
          dragClass={classes['card-ghost']}
          dropPlaceholder={dropPlaceholder}
          shouldAcceptDrop={shouldAcceptDrop}
          className={cc([{ [classes['is-empty']]: !item.childNodes.toArray().length }])}
          taskItemProps={taskItemProps}
          isActive={isActive}
          dispatch={dispatch}
        />
      </WMCollapse>
    </Draggable>
  );
}
