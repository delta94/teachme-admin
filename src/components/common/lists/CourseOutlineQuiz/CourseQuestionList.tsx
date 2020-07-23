import React, { ReactElement } from 'react';
import { Container } from 'react-smooth-dnd';
import cc from 'classcat';

import { QuizQuestion } from '../../../../walkme/data/courseBuild/quiz/question';

import DraggableQuestionItem from './DraggableQuestionItem';
import classes from './style.module.scss';

export interface ICourseItemsList {
  items: Array<QuizQuestion>;
  className?: string;
  onDrop?: any;
  [key: string]: any;
  handleQuestionClicked: (item: QuizQuestion) => void;
}

export default function CourseQuestionList({
  items,
  onDrop,
  className,
  handleQuestionClicked,
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
          <DraggableQuestionItem
            key={i}
            index={i}
            item={item}
            onClick={() => handleQuestionClicked(item)}
          />
        ))}
      </Container>
    </div>
  );
}
