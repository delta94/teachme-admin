import React, { ReactNode, ReactElement } from 'react';
import cc from 'classcat';

import { IDateRange } from '../../../utils/date';
import { useAppSkeleton } from '../../../hooks/skeleton';
import { WMSkeletonInput } from '../WMSkeleton';

import TimeFilter from '../filters/TimeFilter';
import Header from '../Header';

import classes from './style.module.scss';

export interface IScreenHeader {
  title: ReactNode;
  className?: string;
  children?: ReactNode;
  breadcrumbs?: ReactNode;
  timeFilterProps?: {
    dateRange: IDateRange;
    onDateRangeChange: (dateRange: IDateRange | undefined) => void;
  };
  hideTimeFilter?: boolean;
  isLoading?: boolean;
}

export default function ScreenHeader({
  title,
  isLoading,
  className,
  children,
  hideTimeFilter,
  timeFilterProps,
  breadcrumbs,
}: IScreenHeader): ReactElement {
  const appInit = useAppSkeleton();
  const loading = (!appInit && isLoading) || !appInit;

  return (
    <>
      <Header
        className={cc([classes['screen-header'], className, { [classes['skeleton']]: loading }])}
        titleClassName={classes['screen-header-title']}
        title={title}
      >
        {breadcrumbs &&
          (!loading ? (
            <div className={classes['screen-header-breadcrumbs']}>{breadcrumbs}</div>
          ) : (
            <WMSkeletonInput
              className={classes['screen-header-breadcrumbs']}
              active
              style={{ width: 250 }}
            />
          ))}
        {children}
        {!hideTimeFilter && timeFilterProps && (
          <TimeFilter
            className={classes['screen-header-time-filter']}
            isLoading={loading}
            {...timeFilterProps}
          />
        )}
      </Header>
    </>
  );
}
