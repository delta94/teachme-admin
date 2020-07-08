import React, { useState, useEffect } from 'react';
import WMInput from '../WMInput';

interface ITextCounter {
  value?: string | undefined;
  limit?: number | undefined;
}

export default function TextCounter({ value, limit }: ITextCounter): JSX.Element {
  const [content, setContent] = useState(value as string);

  const setFormattedContent = (text: string) => {
    if (limit === undefined) return;
    text.length > limit ? setContent(text.slice(0, limit)) : setContent(text);
  };

  useEffect(() => {
    setFormattedContent(content);
  }, []);

  return (
    <div>
      <WMInput onChange={(event) => setFormattedContent(event.target.value)} value={content} />
      <p>
        {content.length}/{limit}
      </p>
    </div>
  );
}
