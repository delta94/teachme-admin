import React, { ReactElement } from 'react';
import { QuizScreen } from '@walkme/types';

import classes from './style.module.scss';

export default function SuccessScreenForm({ data }: { data: QuizScreen }): ReactElement {
  return (
    <div className={classes['quiz-success-screen-form']}>
      <p>success-screen</p>
      {JSON.stringify(data)}
    </div>
  );
}
