import React from 'react';

import WMTag from '../WMTag';

import { ITagCell } from './tableCells.interface';

export default function TagCell({ value, color, className, ...otherProps }: ITagCell) {
  return <WMTag value={value} color={color} className={className} {...otherProps} />;
}
