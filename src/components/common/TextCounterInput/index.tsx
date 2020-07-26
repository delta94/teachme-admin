import React, { useState, ChangeEvent, ReactElement, useEffect } from 'react';
import cc from 'classcat';

import WMInput, { IWMInput } from '../WMInput';

import classes from './style.module.scss';

export interface ITextCounterInput extends IWMInput {
  label?: string;
  counterClassName?: string;
}

export default function TextCounterInput({
  label,
  maxLength = 30,
  value = '',
  onChange,
  counterClassName,
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
    <div className={cc([classes['text-counter-input'], counterClassName])}>
      <label className={classes['input-label']}>
        {label}
        <WMInput onChange={onInputChange} value={content} maxLength={maxLength} {...otherProps} />
      </label>
      <span className={classes['input-counter']}>
        {content.length}/{maxLength}
      </span>
    </div>
  );
}
