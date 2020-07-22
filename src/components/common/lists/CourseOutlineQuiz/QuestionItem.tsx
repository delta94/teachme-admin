import React, { ReactElement } from 'react';

import { QuizQuestion } from '../../../../walkme/course/mappers/course/quiz/question';

import Icon from '../../Icon';

import classes from './style.module.scss';

export interface IQuestionItem {
  item: QuizQuestion | any;
  index?: number;
}

export default function QuestionItem({ item: { title }, index }: IQuestionItem): ReactElement {
  return (
    <div className={classes['question-item']} key={index}>
      <Icon type="quizItem" className={classes['icon']} />
      <span className={classes['item-title']}>{title}</span>
    </div>
  );
}
