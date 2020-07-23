import React, { ReactElement } from 'react';
import { Draggable } from 'react-smooth-dnd';
import cc from 'classcat';

import { QuizQuestion } from '../../../../walkme/data/courseBuild/quiz/question';

import { QuizScreenType } from '../../QuizEditForm';

import QuestionItem from './QuestionItem';
import classes from './style.module.scss';

export interface IQuestionItem {
  item: QuizQuestion;
  index: number;
  className?: string;
  [key: string]: any;
  onClick: () => void;
}

export default function DraggableQuestionItem({
  item,
  index,
  className,
  onClick,
  ...otherProps
}: IQuestionItem): ReactElement {
  return (
    <Draggable
      key={index}
      className={cc([classes['draggable-question-item'], className])}
      {...otherProps}
    >
      <QuestionItem
        item={{ ...item, type: QuizScreenType.QuestionScreen }}
        key={index}
        onClick={onClick}
      />
    </Draggable>
  );
}
