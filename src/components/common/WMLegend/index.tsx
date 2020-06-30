import React, { ReactElement } from 'react';
import cc from 'classcat';

import Header from '../Header';
import StatusDot, { DotType } from '../StatusDot';

import classes from './style.module.scss';

export interface IWMLegend {
  className?: string;
  title: string;
  dotStatusColor: string;
  children?: string | ReactElement;
}

export default function WMLegend({
  className,
  title,
  dotStatusColor,
  children,
}: IWMLegend): JSX.Element {
  return (
    <div className={cc([classes['legend'], className])}>
      <Header className={classes['legend-header']}>
        <>
          {dotStatusColor && (
            <StatusDot
              className={classes['legend-dot-status']}
              type={DotType.Custom}
              dotColor={dotStatusColor}
            />
          )}
          <span className={classes['legend-title']}>{title}</span>
        </>
      </Header>
      {children}
    </div>
  );
}
