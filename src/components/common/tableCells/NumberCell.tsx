import React, { ReactElement } from 'react';
import cc from 'classcat';

import { INumberCell } from './tableCells.interface';
import classes from './style.module.scss';

export default function NumberCell({ value, className, ...otherProps }: INumberCell): ReactElement {
  return (
    <div className={cc([classes['number-cell'], className])} {...otherProps}>
      {value}
    </div>
  );
}
