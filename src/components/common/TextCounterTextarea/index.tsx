import React, { useState, ReactElement, ChangeEvent } from 'react';

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
  minRows,
  maxRows,
  onChange,
  ...otherProps
}: ITextCounterTextarea): ReactElement {
  const [content, setContent] = useState<string>('');

  const onInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    onChange && onChange(event);
  };

  return (
    <div className={classes['text-counter-text-area']}>
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
