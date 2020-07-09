import React, { useState, ReactElement, ChangeEvent } from 'react';

import WMTextarea from '../WMTextarea';

import classes from './style.module.scss';

interface ITextCounterTextarea {
  placeholder: string | undefined;
  label: string | undefined;
  maxLength: number | undefined;
  minRows?: number | undefined;
  maxRows?: number | undefined;
  onChange: (value: string) => void;
}

export default function TextCounterTextarea({
  placeholder,
  label,
  maxLength,
  minRows,
  maxRows,
  onChange,
}: ITextCounterTextarea): ReactElement {
  const [content, setContent] = useState('' as string);

  const onInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (maxLength === undefined) return;
    setContent(e.target.value);
    onChange(e.target.value);
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
        />
      </label>
      <p className={classes['input-counter']}>
        {content.length}/{maxLength}
      </p>
    </div>
  );
}
