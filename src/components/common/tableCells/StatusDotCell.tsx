import React, { ReactElement } from 'react';

import StatusDot, { DotType } from '../StatusDot';

import { IStatusDotCell } from './tableCells.interface';
import NumberCell from './NumberCell';
import WarningCell from './WarningCell';
import classes from './style.module.scss';

export default function StatusDotCell({
  value,
  passed,
  className,
  ...otherProps
}: IStatusDotCell): ReactElement {
  return (
    <span className={className} {...otherProps}>
      {typeof value === 'number' ? (
        <>
          <StatusDot
            type={passed ? DotType.Success : DotType.Failure}
            className={classes['table-cell-dot']}
          />
          <NumberCell value={Math.round(value)} className={classes.bold} />
        </>
      ) : (
        <WarningCell value={value} />
      )}
    </span>
  );
}
