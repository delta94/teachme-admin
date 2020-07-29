import React, { ReactNode, ReactElement } from 'react';
import cc from 'classcat';

import { IDateRange } from '../../../utils/date';
import { useAppSkeleton } from '../../../hooks/skeleton';
import { WMSkeletonInput } from '../WMSkeleton';

import TimeFilter from '../filters/TimeFilter';
import Header from '../Header';

import classes from './style.module.scss';

export default function ScreenHeader({
  title,
  className,
  children,
  hideTimeFilter,
  timeFilterProps,
  breadcrumbs,
}: {
  title: ReactNode;
  className?: string;
  children?: ReactNode;
  breadcrumbs?: ReactNode;
  timeFilterProps?: {
    dateRange: IDateRange;
    onDateRangeChange: (dateRange: IDateRange | undefined) => void;
  };
  hideTimeFilter?: boolean;
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
            {!hideTimeFilter && timeFilterProps && (
              <TimeFilter className={classes['screen-header-time-filter']} {...timeFilterProps} />
            )}
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
