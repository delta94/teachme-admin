import React, { ReactElement } from 'react';
import cc from 'classcat';

import { ISubtextCell } from './tableCells.interface';
import classes from './style.module.scss';

export default function SubtextCell({
  value,
  subtext,
  className,
  ...otherProps
}: ISubtextCell): ReactElement {
  return (
    <div className={cc([classes['subtext-cell'], className])} {...otherProps}>
      <div className={classes.text}>{value}</div>
      <div className={classes.subtext}>{subtext}</div>
    </div>
  );
}
