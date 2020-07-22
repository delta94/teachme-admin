import React, { ReactElement } from 'react';
import { QuizScreen } from '@walkme/types';

import classes from './style.module.scss';

export default function FailScreenForm({ data }: { data: QuizScreen }): ReactElement {
  return (
    <div className={classes['quiz-fail-screen-form']}>
      <p>fail-screen</p>
      {JSON.stringify(data)}
    </div>
  );
}
