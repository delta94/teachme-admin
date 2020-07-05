import React, { ReactNode, ReactElement } from 'react';
import cc from 'classcat';

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
  return (
    <Header
      className={cc([classes['screen-header'], className])}
      titleClassName={classes['screen-header-title']}
      title={title}
    >
      <>
        {breadcrumbs && <div className={classes['screen-header-breadcrumbs']}>{breadcrumbs}</div>}
        {children}
        {/* TODO: add callback on timeFilterChanges */}
        {!hideTimeFilter && <TimeFilter className={classes['screen-header-time-filter']} />}
      </>
    </Header>
  );
}
