import React, { ReactElement } from 'react';
import cc from 'classcat';

import { QuizQuestion } from '../../../../walkme/course/mappers/course/quiz/question';

import Icon from '../../Icon';

import classes from './style.module.scss';

export interface IQuestionItem {
  item: QuizQuestion | any;
  index?: number;
  className?: string;
}

export default function QuestionItem({
  item: { title },
  index,
  className,
}: IQuestionItem): ReactElement {
  return (
    <div className={cc([classes['question-item'], className])} key={index}>
      <Icon type="quizItem" className={classes['icon']} />
      <span className={classes['item-title']}>{title}</span>
    </div>
  );
}
