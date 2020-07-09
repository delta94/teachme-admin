import React, { useState, ChangeEvent } from 'react';

import WMInput from '../WMInput';

import classes from './style.module.scss';

interface ITextCounterInput {
  placeholder?: string | undefined;
  label?: string | undefined;
  maxLength?: number | undefined;
  onChange: (value: string) => void;
}

export default function TextCounterInput({
  placeholder,
  label,
  maxLength,
  onChange,
}: ITextCounterInput): JSX.Element {
  const [content, setContent] = useState('' as string);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (maxLength === undefined) return;
    setContent(e.target.value);
    onChange(e.target.value);
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
        />
      </label>
      <p className={classes['input-counter']}>
        {content.length}/{maxLength}
      </p>
    </div>
  );
}
