import React, { ReactNode, ReactElement } from 'react';
import cc from 'classcat';

import { useAppSkeleton } from '../../../hooks/skeleton';
import Header from '../Header';
import StatusDot, { DotType } from '../StatusDot';
import WMSkeleton from '../WMSkeleton';
import EmptyLegend from './EmptyLegend';

import classes from './style.module.scss';

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
}: IWMLegend): ReactElement {
  const appInit = useAppSkeleton();

  return (
    <>
      {appInit ? (
        <>
          {hasData ? (
            <div className={cc([classes['legend'], className])}>
              <Header className={classes['legend-header']}>
                <StatusDot
                  className={classes['legend-dot-status']}
                  type={DotType.Custom}
                  dotColor={dotStatusColor}
                />
                <span className={classes['legend-title']}>{title}</span>
              </Header>
              {children}
            </div>
          ) : (
            <EmptyLegend title={title} />
          )}
        </>
      ) : (
        <WMSkeleton active paragraph={{ rows: 2 }} className={classes['legend-skeleton']} />
      )}
    </>
  );
}
