import React, { ReactElement } from 'react';

import TextCounter from '../../common/TextCounterInput';
import TextCounterTextarea from '../TextCounterTextarea';

import classes from './style.module.scss';

export default function WelcomeScreenForm({
  data,
  handleDataChanged,
}: {
  data?: any;
  handleDataChanged: (updatedData: any) => void;
}): ReactElement {
  const onDataChanged = (updatedData: any) => {
    handleDataChanged({ ...data, ...updatedData });
  };

  return (
    <div className={classes['quiz-welcome-screen-form']}>
      <TextCounter
        maxLength={80}
        placeholder="Text"
        label="Title"
        value={data?.title}
        onChange={(e) => onDataChanged({ title: e.target.value })}
      />
      <TextCounterTextarea
        maxLength={210}
        placeholder="Text"
        label="Description"
        value={data?.description}
        minRows={3}
        maxRows={5}
        onChange={(e) => onDataChanged({ description: e.target.value })}
      />
      <TextCounter
        maxLength={80}
        placeholder="Text"
        label="Title"
        value={data?.buttons[0].text}
        onChange={(e) =>
          onDataChanged({
            buttons: data?.buttons.map((btn: any, index: number) =>
              index === 0 ? { ...btn, text: e.target.value } : btn,
            ),
          })
        }
      />
    </div>
  );
}
