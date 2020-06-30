import React, { ReactElement } from 'react';
import cc from 'classcat';

import Header from '../Header';
import StatusDot, { DotType } from '../StatusDot';

import classes from './style.module.scss';

export interface IWMLegend {
  className?: string;
  title: string;
  dotStatusColor: string;
  number?: number;
  description?: string;
  children?: string | ReactElement;
}

export default function WMLegend({
  className,
  title,
  number,
  dotStatusColor,
  description,
  children,
}: IWMLegend): JSX.Element {
  return (
    <div className={cc([classes['legend'], className])}>
      <Header className={classes['legend-header']}>
        <>
          {dotStatusColor && <StatusDot type={DotType.Custom} dotColor={dotStatusColor} />}
          <span className={classes['legend-title']}>{title}</span>
        </>
      </Header>
      {number && (
        <span className={classes['legend-number']}>{new Intl.NumberFormat().format(2130)}</span>
      )}
      {description && <span className={classes['legend-description']}>{description}</span>}
      {children}
    </div>
  );
}
