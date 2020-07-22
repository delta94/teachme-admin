import React, { ReactElement } from 'react';
import { Container } from 'react-smooth-dnd';

import { CourseLesson } from '../../../../walkme/data/courseBuild/courseItems/lesson';
import { CourseChild } from '../../../../walkme/data/courseBuild/courseItems';
import { Course } from '../../../../walkme/data/courseBuild';
import { useCourseEditorContext, ActionType } from '../../../../providers/CourseEditorContext';

import { IWMList } from '../../../common/WMList';

import TaskItem from '../TaskItem';
import CourseOutlineLessonItem from '../CourseOutlineLessonItem';
import CourseOutlineListEmptyState from '../CourseOutlineListEmptyState';

import classes from './style.module.scss';

export { CourseOutlineLessonItem };

export interface ICourseOutlineItem extends CourseLesson {
  isNew?: boolean;
}

export interface ICourseOutlineList<T> extends IWMList<T> {
  items: CourseLesson[] | CourseChild[];
  course: Course;
}

export default function CourseOutlineList<T>({
  items,
  course,
}: ICourseOutlineList<T>): ReactElement {
  const [state, dispatch] = useCourseEditorContext();

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

    dispatch({ type: ActionType.UpdateCourseOutline });
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
        shouldAcceptDrop={() => true}
      >
        {items.length ? (
          (items as any[]).map((item, i) =>
            item.type === 'lesson' ? (
              <CourseOutlineLessonItem
                item={item}
                key={item.id}
                className={classes['outline-lesson']}
              />
            ) : (
              <TaskItem key={i} index={i} item={item} className={classes['outline-task']} />
            ),
          )
        ) : (
          <CourseOutlineListEmptyState />
        )}
      </Container>
    </div>
  );
}
