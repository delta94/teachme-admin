import React, { ReactElement } from 'react';
import { Container } from 'react-smooth-dnd';
import cc from 'classcat';

import { CourseLesson } from '../../../../walkme/data/courseBuild/courseItems/lesson';
import { CourseChild } from '../../../../walkme/data/courseBuild/courseItems';
import { Course } from '../../../../walkme/data/courseBuild';
import { useCourseEditorContext, ActionType } from '../../../../providers/CourseEditorContext';
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
}

export default function CourseOutlineList<T>({
  items,
  course,
  hasQuiz,
  handleItemClick,
}: ICourseOutlineList<T>): ReactElement {
  const [{ activeDetailsItem }, dispatch] = useCourseEditorContext();

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

  const onDeleteTaskItem = (item: any) => {
    const shouldResetActiveDetailsPanel = activeDetailsItem?.id === item.id;

    course?.items.removeItem(item);
    dispatch({
      type: ActionType.UpdateCourseOutline,
      updateHasChange: true,
      closeDetailsPanel: shouldResetActiveDetailsPanel,
    });
  };

  return (
    <div className={classes['course-outline-list']}>
      <Container
        onDrop={(e) => onDrop(e.addedIndex, e.removedIndex, undefined, e.payload)}
        getChildPayload={(index) => items[index]}
        dragClass={classes['card-ghost']}
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: classes['drop-preview'],
        }}
        shouldAcceptDrop={(e: any, payload: any) => !payload.answers}
      >
        {(items as any[]).map((item, i) =>
          item.type === 'lesson' ? (
            <CourseOutlineLessonItem
              item={item}
              key={item.id}
              index={i}
              className={classes['outline-lesson']}
            />
          ) : (
            <TaskItem
              key={i}
              index={i}
              item={item}
              className={cc([classes['outline-task'], classes['task-with-settings']])}
              onClick={(e: any) => handleItemClick && handleItemClick(item)}
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
