import React, { ReactElement, useState } from 'react';
import { QuizScreen, QuizQuestion, BuildQuiz } from '@walkme/types';
import cc from 'classcat';

import classes from './style.module.scss';

export default function SuccessScreenForm({ data }: { data: QuizScreen }): ReactElement {
  return (
    <div className={classes['quiz-success-screen-form']}>
      <p>success-screen</p>
      {JSON.stringify(data)}
    </div>
  );
}
