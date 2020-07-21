import React, { ReactElement } from 'react';
import { Container } from 'react-smooth-dnd';

import { CourseLesson } from '../../../../walkme/course/mappers/course/courseItems/lesson';
import { CourseChild } from '../../../../walkme/course/mappers/course/courseItems';
import { Course } from '../../../../walkme/course/mappers/course';
import { IWMList } from '../../WMList';
import TaskItem from '../TaskItem';

import CourseOutlineLessonItem from './CourseOutlineLessonItem';

import classes from './style.module.scss';

export { CourseOutlineLessonItem };

export interface ICourseOutlineItem extends CourseLesson {
  isNew?: boolean;
}

export interface ICourseOutlineList<T> extends IWMList<T> {
  items: CourseLesson[] | CourseChild[];
  course: Course;
  forceRerender: () => void;
}

export default function CourseOutlineList<T>({
  items,
  course,
  forceRerender,
}: ICourseOutlineList<T>): ReactElement {
  const onDrop = (
    addedIndex: number | undefined | null,
    removedIndex: number | undefined | null,
    destinationItemID: string | undefined,
    payload: any,
  ) => {
    if (addedIndex !== undefined && addedIndex !== null) {
      course?.items.addNewItem(addedIndex, { type: payload.type, id: payload.id });
      forceRerender();
    }
  };

  return (
    <div className={classes['dnd']}>
      <Container
        onDragStart={(e) => console.log('drag started', e)}
        onDragEnd={(e) => console.log('drag end', e)}
        onDrop={(e) => onDrop(e.addedIndex, e.removedIndex, undefined, e.payload)}
        getChildPayload={(index) => items[index]}
        dragClass="card-ghost"
        dropClass="card-ghost-drop"
        onDragEnter={() => {
          console.log('drag enter:');
        }}
        onDragLeave={() => {
          console.log('drag leave:');
        }}
        onDropReady={(p) => console.log('Drop ready: ', p)}
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
              <CourseOutlineLessonItem item={item} key={item.id} forceRerender={forceRerender} />
            ) : (
              <TaskItem key={i} index={i} item={item} />
            ),
          )
        ) : (
          <div className={classes.placeholder}>
            Start building your course by creating lessons and dragging items from the Items List
          </div>
        )}
      </Container>
    </div>
  );
}
