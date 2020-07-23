import React, { ReactElement, useState } from 'react';

import QuizScreenForm from './QuizScreenForm';

import classes from './style.module.scss';

export default function FailScreenForm({
  data,
  handleDataChanged,
}: {
  data?: any;
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
