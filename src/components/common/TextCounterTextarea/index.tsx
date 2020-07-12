import React, { useState, ReactElement, ChangeEvent } from 'react';

import WMTextarea from '../WMTextarea';

import classes from './style.module.scss';

interface ITextCounterTextarea {
  placeholder?: string;
  label?: string;
  maxLength: number;
  minRows?: number;
  maxRows?: number;
  onChange: (value: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextCounterTextarea({
  placeholder,
  label,
  maxLength = 100,
  minRows,
  maxRows,
  onChange,
  ...otherProps
}: ITextCounterTextarea): ReactElement {
  const [content, setContent] = useState<string>('');

  const onInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (maxLength === undefined) return;
    setContent(event.target.value);
    onChange(event);
  };

  return (
    <div className={classes['text-counter-text-area']}>
      <label className={classes['input-label']}>
        {label}
        <WMTextarea
          className={classes['input-text']}
          onChange={onInputChange}
          value={content}
          placeholder={placeholder}
          maxLength={maxLength}
          autosize={{ minRows, maxRows }}
          {...otherProps}
        />
      </label>
      <p className={classes['input-counter']}>
        {content.length}/{maxLength}
      </p>
    </div>
  );
}
