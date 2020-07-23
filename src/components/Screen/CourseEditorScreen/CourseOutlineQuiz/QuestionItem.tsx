import React, { ReactElement } from 'react';
import cc from 'classcat';

import { QuizQuestion } from '../../../../walkme/data/courseBuild/quiz/question';

import Icon from '../../../common/Icon';

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
      {/* just a placeholder icon for now */}
      <Icon type="quizItem" className={classes['icon']} />
      <span className={classes['title']}>{title}</span>
    </div>
  );
}
