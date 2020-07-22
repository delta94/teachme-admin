import React, { ReactElement } from 'react';

import classes from './style.module.scss';

export default function PieBarSummary({
  value,
  unit,
  text,
}: {
  value: string | number;
  unit?: string;
  text?: string;
}): ReactElement {
  return (
    <div className={classes['pie-bar-summary']}>
      {value ? (
        <>
          <span className={classes['pie-bar-value']}>{value}</span>
          {unit && <span className={classes['pie-bar-unit']}>{unit}</span>}
          {text && <span className={classes['pie-bar-text']}>{text}</span>}
        </>
      ) : (
        <span className={classes['pie-bar-value']}>- - : - -</span>
      )}
    </div>
  );
}
