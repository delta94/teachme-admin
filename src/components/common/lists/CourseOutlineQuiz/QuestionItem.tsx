import React, { ReactElement } from 'react';
import cc from 'classcat';

import { QuizQuestion } from '../../../../walkme/data/courseBuild/quiz/question';

import Icon from '../../Icon';

import classes from './style.module.scss';

export interface IQuestionItem {
  item: QuizQuestion | any;
  index?: number;
  className?: string;
  onClick: () => void;
}

export default function QuestionItem({
  item: { title, type },
  index,
  className,
  onClick,
}: IQuestionItem): ReactElement {
  return (
    <div onClick={onClick} className={cc([classes['question-item'], className])} key={index}>
      <Icon type={`quiz-${type}`} className={classes['icon']} />
      <span className={classes['item-title']}>{title}</span>
    </div>
  );
}
