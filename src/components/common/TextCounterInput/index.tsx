import React, { useState, ChangeEvent, ReactElement } from 'react';

import WMInput from '../WMInput';

import classes from './style.module.scss';

interface ITextCounterInput {
  placeholder?: string;
  label?: string;
  maxLength: number;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

export default function TextCounterInput({
  placeholder,
  label,
  maxLength = 30,
  onChange,
  ...otherProps
}: ITextCounterInput): ReactElement {
  const [content, setContent] = useState<string>('');

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
    onChange(event);
  };

  return (
    <div className={classes['text-counter-input']}>
      <label className={classes['input-label']}>
        {label}
        <WMInput
          className={classes['input-text']}
          onChange={onInputChange}
          value={content}
          placeholder={placeholder}
          maxLength={maxLength}
          {...otherProps}
        />
      </label>
      <p className={classes['input-counter']}>
        {content.length}/{maxLength}
      </p>
    </div>
  );
}
