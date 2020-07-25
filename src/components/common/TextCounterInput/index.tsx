import React, { useState, ChangeEvent, ReactElement, useEffect } from 'react';

import WMInput, { IWMInput } from '../WMInput';

import classes from './style.module.scss';

export interface ITextCounterInput extends IWMInput {
  label?: string;
}

export default function TextCounterInput({
  label,
  maxLength = 30,
  value = '',
  onChange,
  ...otherProps
}: ITextCounterInput): ReactElement {
  const [content, setContent] = useState<string>(value as string);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
    onChange && onChange(event);
  };

  useEffect(() => {
    setContent(value as string);
  }, [value]);

  return (
    <div className={classes['text-counter-input']}>
      <label className={classes['input-label']}>
        {label}
        <WMInput onChange={onInputChange} value={content} maxLength={maxLength} {...otherProps} />
      </label>
      <p className={classes['input-counter']}>
        {content.length}/{maxLength}
      </p>
    </div>
  );
}
