import React, { ReactNode } from 'react';
import cc from 'classcat';

import Header from '../Header';
import StatusDot, { DotType } from '../StatusDot';

import classes from './style.module.scss';

export interface IWMLegend {
  className?: string;
  title: string;
  dotStatusColor: string;
  children?: ReactNode;
  usersStarted?: number;
  usersCompleted?: number;
}

export default function WMLegend({
  className,
  title,
  dotStatusColor,
  children,
  usersStarted,
  usersCompleted,
}: IWMLegend): JSX.Element {
  const isEmpty = usersStarted === 0 || (usersStarted === 0 && usersCompleted === 0);

  return (
    <>
      {isEmpty ? (
        <div className={cc([classes['legend'], className])}>
          <Header className={classes['legend-header']}>
            <>
              <StatusDot className={classes['legend-dot-status']} type={DotType.Disable} />
              <span className={classes['legend-title']}>{title}</span>
            </>
          </Header>
          {
            <>
              <span className={classes['empty-number']}>- -</span>
              <span className={classes['legend-description']}> </span>
            </>
          }
        </div>
      ) : (
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
      )}
    </>
  );
}
