import React, { ReactElement } from 'react';
import { QuizScreen, BaseQuizQuestion } from '@walkme/types';

import classes from './style.module.scss';

export default function WelcomeScreenForm({
  data,
}: {
  data?: BaseQuizQuestion | QuizScreen;
}): ReactElement {
  return (
    <div className={classes['quiz-welcome-screen-form']}>
      <p>welcome-screen</p>
      {JSON.stringify(data)}
    </div>
  );
}
