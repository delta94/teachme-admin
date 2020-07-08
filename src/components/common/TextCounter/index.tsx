import React, { useState } from 'react';

import WMInput from '../WMInput';

import classes from './style.module.scss';
interface ITextCounter {
  placeholder?: string | undefined;
  label?: string | undefined;
  maxLength?: number | undefined;
  size?: string | undefined;
}

export default function TextCounter({ placeholder, label, maxLength }: ITextCounter): JSX.Element {
  const [content, setContent] = useState('' as string);

  const setFormattedContent = (text: string) => {
    if (maxLength === undefined) return;
    setContent(text);
  };

  return (
    <div className={classes['text-counter']}>
      <label className={classes['input-label']}>{label}</label>
      <WMInput
        className={classes['input-text']}
        onChange={(e: any) => setFormattedContent(e.target.value)}
        value={content}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      <p className={classes['input-counter']}>
        {content.length}/{maxLength}
      </p>
    </div>
  );
}
