import React, { ReactElement, useState, useEffect } from 'react';

import TextCounter from '../../common/TextCounterInput';
import TextCounterTextarea from '../TextCounterTextarea';

export default function QuizScreenForm({
  data,
  handleDataChange,
}: {
  data: any;
  handleDataChange: (updatedData: any) => void;
}): ReactElement {
  const [question, setScreen] = useState(data);
  const onDataChange = (updatedData: any) => {
    handleDataChange({ ...question, ...updatedData });

    setScreen((prev: any) => ({
      ...prev,
      ...updatedData,
    }));
  };

  useEffect(() => {
    setScreen(data);
  }, [data]);

  const onButtonTextChange = (value: string, buttonIndex: number) => {
    onDataChange({
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
        onChange={(e) => onDataChange({ title: e.target.value })}
      />
      <TextCounterTextarea
        maxLength={210}
        placeholder="Text"
        label="Description"
        value={data.description}
        minRows={3}
        maxRows={5}
        onChange={(e) => onDataChange({ description: e.target.value })}
      />
      {data.buttons.map((button: any, index: number) => (
        <TextCounter
          key={`quiz-form-button-${index}`}
          maxLength={80}
          placeholder="Text"
          label="Title"
          value={button.text}
          onChange={(e) => onButtonTextChange(e.target.value, index)}
        />
      ))}
    </>
  );
}
