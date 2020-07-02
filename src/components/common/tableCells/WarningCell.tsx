import React from 'react';

import { ITextCell } from './tableCells.interface';
import TextCell from './TextCell';

export default function WarningCell({ value, className, ...otherProps }: ITextCell) {
  return <TextCell value={`⊘ ${value}`} className={className} {...otherProps} />;
}
