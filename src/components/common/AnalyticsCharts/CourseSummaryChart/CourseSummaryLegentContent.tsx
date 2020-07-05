import React, { ReactNode } from 'react';

import classes from './style.module.scss';

export default function CourseSummaryLegendContent({
  number,
  description,
}: {
  number: number;
  description?: string;
}): ReactNode {
  return (
    <div className={classes['chart-legend-content']}>
      <span className={classes['legend-number']}>{new Intl.NumberFormat().format(number)}</span>
      <span className={classes['legend-description']}>{description}</span>
    </div>
  );
}
