import React, { ReactElement, useState } from 'react';
import { QuizScreen, QuizQuestion, BuildQuiz } from '@walkme/types';
import cc from 'classcat';

import classes from './style.module.scss';

export default function SuccessScreenForm({
  data,
}: {
  data: QuizScreen | QuizQuestion;
}): ReactElement {
  return <div className={classes['quiz-form']}>{JSON.stringify(data)}</div>;
}
