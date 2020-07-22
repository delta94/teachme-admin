import React, { ReactElement } from 'react';
import { BaseQuizQuestion, QuizScreen } from '@walkme/types';

import classes from './style.module.scss';

export default function QuestionScreenForm({
  data,
}: {
  data?: BaseQuizQuestion | QuizScreen;
}): ReactElement {
  return (
    <div className={classes['quiz-question-screen-form']}>
      <p>question-screen</p>
      {JSON.stringify(data)}
    </div>
  );
}
