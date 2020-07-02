import React from 'react';
import cc from 'classcat';

import { INumberCell } from './tableCells.interface';
import classes from './style.module.scss';

export default function NumberCell({ value, className, ...otherProps }: INumberCell) {
  return (
    <span className={cc([classes['number-cell'], className])} {...otherProps}>
      {value}
    </span>
  );
}
