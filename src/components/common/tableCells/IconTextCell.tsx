import React from 'react';
import cc from 'classcat';

import { IIconTextCell } from './tableCells.interface';

import classes from './style.module.scss';

export default function IconTextCell({ value, icon, className, ...otherProps }: IIconTextCell) {
  return (
    <span className={cc([classes['icon-text-cell'], className])} {...otherProps}>
      {icon}
      <span className="text">{value}</span>
    </span>
  );
}
