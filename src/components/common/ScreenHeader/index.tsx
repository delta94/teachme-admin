import React, { ReactNode, ReactElement, useEffect, useState } from 'react';
import cc from 'classcat';

import TimeFilter from '../filters/TimeFilter';
import Header from '../Header';
import { useAppContext } from '../../../providers/AppContext';
import { WMSkeletonInput } from '../WMSkeleton';

import classes from './style.module.scss';

export default function ScreenHeader({
  title,
  className,
  children,
  hideTimeFilter,
  breadcrumbs,
}: {
  title: ReactNode;
  className?: string;
  hideTimeFilter?: boolean;
  children?: ReactNode;
  breadcrumbs?: ReactNode;
}): ReactElement {
  const [appState, appDispatch] = useAppContext();
  const { isUpdating } = appState;
  const [appInit, setAppInit] = useState(false);

  useEffect(() => {
    if (!isUpdating && !appInit) setAppInit(true);
  }, [isUpdating, appInit]);

  return (
    <>
      <Header
        className={cc([classes['screen-header'], className])}
        titleClassName={classes['screen-header-title']}
        title={title}
      >
        {appInit ? (
          <>
            {breadcrumbs && (
              <div className={classes['screen-header-breadcrumbs']}>{breadcrumbs}</div>
            )}
            {children}
            {/* TODO: add callback on timeFilterChanges */}
            {!hideTimeFilter && <TimeFilter className={classes['screen-header-time-filter']} />}
          </>
        ) : (
          <WMSkeletonInput
            className={classes['screen-header-skeleton']}
            style={{ width: 250 }}
            active
          />
        )}
      </Header>
    </>
  );
}
