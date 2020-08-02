import React, { ReactElement } from 'react';

import { ITextCell } from './tableCells.interface';
import TextCell from './TextCell';

export default function WarningCell({ value, className, ...otherProps }: ITextCell): ReactElement {
  return <TextCell value={`⊘ ${value}`} className={className} {...otherProps} />;
}
