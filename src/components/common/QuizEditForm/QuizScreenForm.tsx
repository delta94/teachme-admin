import React, { ReactElement } from 'react';

import TextCounter from '../../common/TextCounterInput';
import TextCounterTextarea from '../TextCounterTextarea';

export default function QuizScreenForm({
  data,
  onDataChanged,
}: {
  data: any;
  onDataChanged: (updatedData: any) => void;
}): ReactElement {
  const buttonTextChanged = (value: string, buttonIndex: number) => {
    onDataChanged({
      buttons: data.buttons.map((btn: any, index: number) =>
        index === buttonIndex ? { ...btn, text: value } : btn,
      ),
    });
  };

  return (
    <>
      <TextCounter
        maxLength={80}
        placeholder="Text"
        label="Title"
        value={data.title}
        onChange={(e) => onDataChanged({ title: e.target.value })}
      />
      <TextCounterTextarea
        maxLength={210}
        placeholder="Text"
        label="Description"
        value={data.description}
        minRows={3}
        maxRows={5}
        onChange={(e) => onDataChanged({ description: e.target.value })}
      />
      {data.buttons.map((button: any, index: number) => (
        <TextCounter
          key={`quiz-form-button-${index}`}
          maxLength={80}
          placeholder="Text"
          label="Title"
          value={button.text}
          onChange={(e) => buttonTextChanged(e.target.value, index)}
        />
      ))}
    </>
  );
}
