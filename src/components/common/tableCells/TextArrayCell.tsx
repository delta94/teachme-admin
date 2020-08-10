import React, { ReactElement } from 'react';

import { ITextArrayCell } from './tableCells.interface';

export default function TextArrayCell({
  value,
  className,
  ...otherProps
}: ITextArrayCell): ReactElement {
  const text = value.join(', ');

  return (
    <div className={className} {...otherProps}>
      {text}
    </div>
  );
}
