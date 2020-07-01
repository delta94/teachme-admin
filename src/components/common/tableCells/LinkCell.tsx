import React from 'react';
import { Link } from 'react-router-dom';
import cc from 'classcat';

import { ILinkCell } from './tableCells.interface';
import classes from './style.module.scss';

export default function LinkCell({ value, to, className, ...otherProps }: ILinkCell) {
  return (
    <Link to={to} className={cc([classes['link-cell'], className])} {...otherProps}>
      {value}
    </Link>
  );
}
