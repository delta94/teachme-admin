import React, { ReactElement, useState } from 'react';
import { QuizScreen, BaseQuizQuestion } from '@walkme/types';

import QuizScreenForm from './QuizScreenForm';

import classes from './style.module.scss';

export default function SuccessScreenForm({
  data,
  handleDataChanged,
}: {
  data: BaseQuizQuestion | QuizScreen;
  handleDataChanged: (updatedData: any) => void;
}): ReactElement {
  const [screen, setScreen] = useState(data);
  const onDataChanged = (updatedData: any) => {
    handleDataChanged({ ...screen, ...updatedData });

    setScreen((prev: any) => ({
      ...prev,
      ...updatedData,
    }));
  };

  return (
    <div className={classes['quiz-success-screen-form']}>
      <QuizScreenForm data={screen} onDataChanged={onDataChanged} />
    </div>
  );
}
