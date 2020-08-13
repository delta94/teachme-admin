import React, { ReactNode, ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import cc from 'classcat';

import { IDateRange } from '../../../utils/date';
import { useAppSkeleton } from '../../../hooks/skeleton';
import { WMSkeletonInput } from '../WMSkeleton';

import LastUpdateTime from '../LastUpdateTime';
import TimeFilter from '../filters/TimeFilter';
import Header from '../Header';

import classes from './style.module.scss';

export interface IScreenHeader {
  title: ReactNode;
  className?: string;
  children?: ReactNode;
  datetime?: string;
  breadcrumbs?: ReactNode;
  timeFilterProps?: {
    dateRange: IDateRange;
    onDateRangeChange: (dateRange: IDateRange | undefined) => void;
  };
  hideTimeFilter?: boolean;
  isLoading?: boolean;
  subTitle?: ReactNode;
}

export default function ScreenHeader({
  title,
  isLoading,
  className,
  children,
  datetime,
  hideTimeFilter,
  timeFilterProps,
  breadcrumbs,
  subTitle,
}: IScreenHeader): ReactElement {
  const { courseId } = useParams();
  const appInit = useAppSkeleton();
  const loading = (!appInit && isLoading) || !appInit;

  return (
    <>
      <Header
        className={cc([
          classes['screen-header'],
          className,
          { [classes['skeleton']]: loading, [classes['course']]: Boolean(courseId) },
        ])}
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
        <LastUpdateTime datetime={datetime} />
        {!hideTimeFilter && timeFilterProps && (
          <TimeFilter
            className={classes['screen-header-time-filter']}
            isLoading={loading}
            {...timeFilterProps}
          />
        )}
        {subTitle && <div className={classes['sub-title']}>{subTitle}</div>}
      </Header>
    </>
  );
}
