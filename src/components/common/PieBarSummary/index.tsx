import React from 'react';

import classes from './style.module.scss';

export default function PieBarSummary({
  value,
  unit,
  text,
}: {
  value: string | number;
  unit?: string;
  text?: string;
}): JSX.Element {
  return (
    <div className={classes['pie-bar-summary']}>
      <span className={classes.value}>{value}</span>
      {unit && <span className={classes.unit}>{unit}</span>}
      {text && <span className={classes.text}>{text}</span>}
    </div>
  );
}
