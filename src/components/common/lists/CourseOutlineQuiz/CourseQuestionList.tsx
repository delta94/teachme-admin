import React, { ReactElement } from 'react';
import { Container } from 'react-smooth-dnd';

import cc from 'classcat';

import { QuizQuestion } from '../../../../walkme/course/mappers/course/quiz/question';

import DraggableQuestionItem from './DraggableQuestionItem';
import classes from './style.module.scss';

export interface ICourseItemsList {
  items: Array<QuizQuestion>;
  className?: string;
  onDrop?: any;
  [key: string]: any;
}

export default function CourseQuestionList({
  items,
  onDrop,
  className,
  ...otherProps
}: ICourseItemsList): ReactElement {
  return (
    <div className={cc([classes['course-question-list'], className])}>
      <Container
        {...otherProps}
        getChildPayload={(i) => items[i]}
        onDrop={onDrop}
        dragClass={classes['card-ghost']}
      >
        {items.map((item, i: number) => (
          <DraggableQuestionItem key={i} index={i} item={item} />
        ))}
      </Container>
    </div>
  );
}
