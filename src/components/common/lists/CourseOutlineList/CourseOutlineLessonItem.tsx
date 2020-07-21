import React, { ReactElement } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';

import WMCollapse, { WMCollapsePanel } from '../../WMCollapse';
import Header from '../../Header';
import Icon, { IconType } from '../../Icon';
import { CourseItemsList } from '../../lists';
import EditableTitle, { EditableTitleType } from '../../EditableTitle';

import { CourseLesson } from '../../../../walkme/course/mappers/course/courseItems/lesson';

import classes from './style.module.scss';

export interface INewLesson extends CourseLesson {
  isNew?: boolean;
}

export default function CourseOutlineLessonItem({
  item,
  forceRerender,
}: {
  item: INewLesson;
  forceRerender: () => void;
}): ReactElement {
  const onInnerDrop = (e: any, destinationItemID: string | undefined) => {
    console.log('on inner drop', e, destinationItemID);

    const isReorder =
      e.addedIndex !== undefined &&
      e.addedIndex !== null &&
      e.removedIndex !== undefined &&
      e.removedIndex !== null;

    const isAdded = e.addedIndex !== undefined && e.addedIndex !== null;

    if (isReorder) {
      item.childNodes.changeIndex(e.addedIndex, e.payload);
    } else if (isAdded) {
      item.childNodes.addNewItem(e.addedIndex, e.payload);
    }

    forceRerender();
  };

  return (
    <Draggable className={classes['course-outline-list']}>
      <WMCollapse className={classes['lesson']}>
        <WMCollapsePanel
          header={
            <Header className={classes['lesson-header']}>
              <Icon type={IconType.Lesson} />
              <EditableTitle
                type={EditableTitleType.Lesson}
                isNew={Boolean(item.isNew)}
                onBlur={(value: string) => {
                  const { isNew, ...newItem } = item;
                  console.log('new lesson name should be', value);
                }}
                value={item.title}
              />
            </Header>
          }
          key={item.id}
        >
          <Container
            groupName="col"
            // onDragStart={(e) => console.log('drag started', e)}
            // onDragEnd={(e) => console.log('drag end', e)}
            onDrop={(e) => onInnerDrop(e, item.id.toString())}
            getChildPayload={(index) => item}
            dragClass="card-ghost"
            dropClass="card-ghost-drop"
            /* onDragEnter={() => {
              console.log('drag enter:', item.id.toString());
            }}
            onDragLeave={() => {
              console.log('drag leave:', item.id.toString());
            }}
            onDropReady={(p) => console.log('Drop ready: ', p)} */
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: classes['drop-preview'],
            }}
            shouldAcceptDrop={() => true}
          >
            {item.childNodes?.toArray().length ? (
              <CourseItemsList items={item.childNodes.toArray()} behaviour="copy" groupName="col" />
            ) : (
              <div>Drop things here</div>
            )}
          </Container>
        </WMCollapsePanel>
      </WMCollapse>
    </Draggable>
  );
}
