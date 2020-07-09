import React, { useState } from 'react';

import WMTextarea from '../WMTextarea';

import classes from './style.module.scss';

interface ITextCounterTextarea {
  placeholder?: string | undefined;
  label?: string | undefined;
  maxLength?: number | undefined;
  minRows?: number | undefined;
  maxRows?: number | undefined;
}

export default function TextCounterTextarea({
  placeholder,
  label,
  maxLength,
  minRows,
  maxRows,
}: ITextCounterTextarea): JSX.Element {
  const [content, setContent] = useState('' as string);

  const setFormattedContent = (text: string) => {
    if (maxLength === undefined) return;
    setContent(text);
  };

  return (
    <div className={classes['text-counter']}>
      <label className={classes['input-label']}>{label}</label>
      <WMTextarea
        className={classes['input-text']}
        onChange={(e: any) => setFormattedContent(e.target.value)}
        value={content}
        placeholder={placeholder}
        maxLength={maxLength}
        autosize={{ minRows, maxRows }}
      />
      <p className={classes['input-counter']}>
        {content.length}/{maxLength}
      </p>
    </div>
  );
}
