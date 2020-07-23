import React, { ReactNode, ReactElement, useState, useEffect } from 'react';
import cc from 'classcat';

import { useAppContext } from '../../../providers/AppContext';
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
  const [appState, appDispatch] = useAppContext();
  const { isUpdating } = appState;
  const [appInit, setAppInit] = useState(false);

  useEffect(() => {
    if (!isUpdating && !appInit) setAppInit(true);
  }, [isUpdating, appInit]);

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
        <WMSkeleton active paragraph={{ rows: 2 }} />
      )}
    </>
  );
}
