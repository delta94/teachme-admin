import React, { ReactElement } from 'react';
import { Draggable } from 'react-smooth-dnd';
import cc from 'classcat';

import { QuizQuestion } from '../../../../walkme/data/courseBuild/quiz/question';

import classes from './style.module.scss';
import QuestionItem from './QuestionItem';

export interface IQuestionItem {
  item: QuizQuestion;
  index: number;
  className?: string;
  [key: string]: any;
}

export default function DraggableQuestionItem({
  item,
  index,
  className,
  ...otherProps
}: IQuestionItem): ReactElement {
  return (
    <Draggable
      key={index}
      className={cc([classes['draggable-question-item'], className])}
      {...otherProps}
    >
      <QuestionItem item={item} key={index} />
    </Draggable>
  );
}
