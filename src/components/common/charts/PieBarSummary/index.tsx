import React, { ReactElement } from 'react';
import moment from 'moment';

import { isValidNumber } from '../../../../utils';

import classes from './style.module.scss';

export default function PieBarSummary({
  value,
  unit,
  text,
}: {
  value?: number;
  unit?: string;
  text?: string;
}): ReactElement {
  return (
    <div className={classes['pie-bar-summary']}>
      {isValidNumber(value) ? (
        <>
          <span className={classes['value']}>{moment.duration(value, 'hours')}</span>
          {/* {unit && <span className={classes['unit']}>{unit}</span>} */}
          {text && <span className={classes['text']}>{text}</span>}
        </>
      ) : (
        <span className={classes['value']}>- - : - -</span>
      )}
    </div>
  );
}
