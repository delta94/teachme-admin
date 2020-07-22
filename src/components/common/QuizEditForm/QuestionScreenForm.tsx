import React, { ReactElement } from 'react';
import { BaseQuizQuestion } from '@walkme/types';
import cc from 'classcat';

import classes from './style.module.scss';

export default function QuestionScreenForm({ data }: { data: BaseQuizQuestion }): ReactElement {
  return (
    <div className={classes['quiz-question-screen-form']}>
      <p>question-screen</p>
      {JSON.stringify(data)}
    </div>
  );
}
