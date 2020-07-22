import React, { ReactElement } from 'react';

import Header from '../Header';
import StatusDot, { DotType } from '../StatusDot';

import classes from './style.module.scss';

export interface IWMEmptyLegend {
  title: string;
}

export default function EmptyLegend({ title }: IWMEmptyLegend): ReactElement {
  return (
    <div className={classes['legend']}>
      <Header className={classes['legend-header']}>
        <StatusDot className={classes['legend-dot-status']} type={DotType.Disable} />
        <span className={classes['legend-title']}>{title}</span>
      </Header>
      <span className={classes['empty-number']}>- -</span>
    </div>
  );
}
