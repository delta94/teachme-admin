import React, { ReactElement } from 'react';
import { ContentItem, TypeName } from '@walkme/types';
import { Container } from 'react-smooth-dnd';
import cc from 'classcat';

import { CourseLesson } from '../../../../walkme/course/mappers/course/courseItems/lesson';
import { CourseChild } from '../../../../walkme/course/mappers/course/courseItems';

import WMList, { WMListItem, IWMList } from '../../WMList';
import Icon from '../../Icon';

import { Course } from '../../../../walkme/course/mappers/course';
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
          (items as any[]).map((item) =>
            item.type === 'lesson' ? (
              <CourseOutlineLessonItem item={item} key={item.id} forceRerender={forceRerender} />
            ) : (
              <WMListItem className={classes['course-item']} icon={<Icon type={item.type} />}>
                {item.title}
              </WMListItem>
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
