import React, { useState, ReactElement, ChangeEvent, useEffect } from 'react';
import { TextAreaProps } from 'antd/lib/input';

import WMTextarea from '../WMTextarea';

import classes from './style.module.scss';

export interface ITextCounterTextarea extends TextAreaProps {
  label?: string;
  minRows?: number;
  maxRows?: number;
}

export default function TextCounterTextarea({
  label,
  maxLength = 100,
  value = '',
  minRows,
  maxRows,
  onChange,
  ...otherProps
}: ITextCounterTextarea): ReactElement {
  const [content, setContent] = useState<string>(value as string);

  const onInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    onChange && onChange(event);
  };

  useEffect(() => {
    setContent(value as string);
  }, [value]);

  return (
    <div className={classes['text-counter-textarea']}>
      <label className={classes['input-label']}>
        {label}
        <WMTextarea
          onChange={onInputChange}
          value={content}
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
