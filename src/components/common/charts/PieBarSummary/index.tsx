import React, { ReactElement } from 'react';

import { isValidNumber } from '../../../../utils';

import classes from './style.module.scss';

export default function PieBarSummary({
  value,
  unit,
  text,
}: {
  value?: number | string;
  unit?: string;
  text?: string;
}): ReactElement {
  return (
    <div className={classes['pie-bar-summary']}>
      {isValidNumber(value) || typeof value === 'string' ? (
        <>
          <span className={classes['value']}>{value}</span>
          {unit && <span className={classes['unit']}>{unit}</span>}
          {text && <span className={classes['text']}>{text}</span>}
        </>
      ) : (
        <span className={classes['value']}>- - : - -</span>
      )}
    </div>
  );
}
