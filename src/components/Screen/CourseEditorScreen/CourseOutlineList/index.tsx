import React, { Dispatch, ReactElement, useCallback, useMemo } from 'react';
import { Container } from 'react-smooth-dnd';
import cc from 'classcat';

import { ContentItem } from '@walkme/types';
import { ActiveDetailsItem } from '../../../../providers/CourseEditorContext/course-editor-context.interface';
import { CourseLesson } from '../../../../walkme/data/courseBuild/courseItems/lesson';
import { CourseChild } from '../../../../walkme/data/courseBuild/courseItems';
import { Course } from '../../../../walkme/data/courseBuild';
import { ActionType } from '../../../../providers/CourseEditorContext';
import { IWMList } from '../../../common/WMList';
import TaskItem from '../TaskItem';
import CourseOutlineLessonItem from '../CourseOutlineLessonItem';

import classes from './style.module.scss';

export { CourseOutlineLessonItem };

export interface ICourseOutlineItem extends CourseLesson {
  isNew?: boolean;
}

export interface ICourseOutlineList<T> extends IWMList<T> {
  items: CourseLesson[] | CourseChild[];
  course: Course;
  hasQuiz: boolean;
  handleItemClick?: (item: any) => void;
  newLessonId?: number;
  activeDetailsItem: ActiveDetailsItem | null;
  dispatch: Dispatch<any>;
}

export default function CourseOutlineList<T>({
  items,
  course,
  handleItemClick,
  hasQuiz,
  newLessonId,
  activeDetailsItem,
  dispatch,
}: ICourseOutlineList<T>): ReactElement {
  const onDrop = (
    addedIndex: number | undefined | null,
    removedIndex: number | undefined | null,
    destinationItemID: string | undefined,
    payload: any,
  ) => {
    const isAdd = addedIndex !== undefined && addedIndex !== null;
    const isRemove = removedIndex !== undefined && removedIndex !== null;
    const isReorder = isAdd && isRemove;

    // ts doesn't seem to recognize that the `if` statement protects against missing indexes
    if (isReorder) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      course?.items.changeIndex(payload, addedIndex);
    } else if (isAdd) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      course?.items.addNewItem(addedIndex, payload);
    } else if (isRemove) {
      course?.items.removeItem(payload);
    }

    dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
  };

  const onDeleteTaskItem = useCallback(
    (item: any) => {
      const shouldResetActiveDetailsPanel = activeDetailsItem?.id === item.id;
      course?.items.removeItem(item);
      dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });

      // on delete activeDetailsItem should close the details pane
      if (shouldResetActiveDetailsPanel) dispatch({ type: ActionType.CloseDetailsPanel });
    },
    [activeDetailsItem?.id, course?.items?.removeItem, dispatch],
  );

  const shouldAcceptDrop = useCallback((e: any, payload: any) => !payload.answers, []);
  const getChildPayload = useCallback((index) => items[index], [items]);
  const onClick = useCallback(
    (e: any, item: ContentItem) => handleItemClick && handleItemClick(item),
    [handleItemClick],
  );
  const onDropItem = useCallback(
    (e) => onDrop(e.addedIndex, e.removedIndex, undefined, e.payload),
    [onDrop],
  );
  const dropPlaceholder = useMemo(
    () => ({
      animationDuration: 150,
      showOnTop: true,
      className: classes['drop-preview'],
    }),
    [],
  );

  return (
    <div
      className={cc([
        classes['course-outline-list'],
        { [classes['is-empty']]: !items.length, [classes['has-quiz']]: hasQuiz },
      ])}
    >
      <Container
        onDrop={onDropItem}
        getChildPayload={getChildPayload}
        dragClass={classes['card-ghost']}
        dropPlaceholder={dropPlaceholder}
        shouldAcceptDrop={shouldAcceptDrop}
      >
        {(items as any[]).map((item, i) =>
          item.type === 'lesson' ? (
            <CourseOutlineLessonItem
              item={item}
              key={item.id}
              index={i}
              innerClassName={classes['outline-lesson']}
              newLessonId={newLessonId}
              course={course}
              activeDetailsItem={activeDetailsItem}
              dispatch={dispatch}
            />
          ) : (
            <TaskItem
              key={item.id}
              index={i}
              item={item}
              className={classes['remove-item-border']}
              innerClassName={cc([classes['outline-task'], classes['task-with-settings']])}
              onClick={onClick}
              deletable
              onDelete={onDeleteTaskItem}
              active={activeDetailsItem?.id === item.id}
            />
          ),
        )}
      </Container>
    </div>
  );
}
