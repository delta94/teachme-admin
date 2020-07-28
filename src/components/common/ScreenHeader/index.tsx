import React, { ReactNode, ReactElement } from 'react';
import cc from 'classcat';

import { useAppSkeleton } from '../../../Hook';
import { WMSkeletonInput } from '../WMSkeleton';
import TimeFilter from '../filters/TimeFilter';
import Header from '../Header';

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
  const appInit = useAppSkeleton();

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
