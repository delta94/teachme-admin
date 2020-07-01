import React from 'react';

import { ITextCell } from './tableCells.interface';

export default function TextCell({ value, className, ...otherProps }: ITextCell) {
  return (
    <span className={className} {...otherProps}>
      {value}
    </span>
  );
}
