import React, { useState, useEffect } from 'react';
import WMInput from '../WMInput';

interface ITextCounter {
  value?: string | undefined;
  label?: string | undefined;
  maxLength?: number | undefined;
}

export default function TextCounter({ value, label, maxLength }: ITextCounter): JSX.Element {
  const [content, setContent] = useState(value as string);

  const setFormattedContent = (text: string) => {
    if (maxLength === undefined) return;
    setContent(text);
  };

  useEffect(() => {
    setFormattedContent(content);
  }, []);

  return (
    <div>
      <label>{label}</label>
      <WMInput
        onChange={(e: any) => setFormattedContent(e.target.value)}
        value={content}
        maxLength={maxLength}
      />
      <p>
        {content.length}/{maxLength}
      </p>
    </div>
  );
}
