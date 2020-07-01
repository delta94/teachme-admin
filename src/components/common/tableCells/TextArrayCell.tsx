import React from 'react';

import { ITextArrayCell } from './tableCells.interface';

export default function TextArrayCell({ value, className, ...otherProps }: ITextArrayCell) {
  const text = value.join(', ');

  return (
    <span className={className} {...otherProps}>
      {text}
    </span>
  );
}
