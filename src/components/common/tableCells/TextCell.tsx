import React, { ReactElement } from 'react';

import { ITextCell } from './tableCells.interface';

export default function TextCell({ value, className, ...otherProps }: ITextCell): ReactElement {
  return (
    <div className={className} {...otherProps}>
      {value}
    </div>
  );
}
