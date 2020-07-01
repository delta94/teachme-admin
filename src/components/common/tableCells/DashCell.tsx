import React from 'react';

import { IDashCell } from './tableCells.interface';

export default function DashCell({ value, children, className, ...otherProps }: IDashCell) {
  const hasValue = value !== undefined && value !== null;

  return hasValue ? (
    <>{children}</>
  ) : (
    <span className={className} {...otherProps}>
      —
    </span>
  );
}
