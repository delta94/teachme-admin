import React, { ReactNode } from 'react';
import cc from 'classcat';

import Header from '../Header';
import StatusDot, { DotType } from '../StatusDot';

import classes from './style.module.scss';
import EmptyLegend from './EmptyLegend';

export interface IWMLegend {
  className?: string;
  title: string;
  dotStatusColor: string;
  children?: ReactNode;
  hasData?: boolean;
}

export default function WMLegend({
  className,
  title,
  dotStatusColor,
  children,
  hasData,
}: IWMLegend): JSX.Element {
  return (
    <>
      {hasData ? (
        <div className={cc([classes['legend'], className])}>
          <Header className={classes['legend-header']}>
            <>
              <StatusDot
                className={classes['legend-dot-status']}
                type={DotType.Custom}
                dotColor={dotStatusColor}
              />
              <span className={classes['legend-title']}>{title}</span>
            </>
          </Header>
          {children}
        </div>
      ) : (
        <EmptyLegend title={title} />
      )}
    </>
  );
}
