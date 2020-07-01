import React, { ReactNode } from 'react';

import TimeFilter from '../filters/TimeFilter';
import Header from '../Header';

import classes from './style.module.scss';

export default function ScreenHeader({
  title,
  children,
  hideTimeFilter,
}: {
  title: ReactNode;
  hideTimeFilter?: boolean;
  children?: ReactNode;
}) {
  return (
    <Header
      className={classes['screen-header']}
      titleClassName={classes['screen-header-title']}
      title={title}
    >
      <>
        {!hideTimeFilter && <TimeFilter className={classes['screen-header-time-filter']} />}
        {children}
      </>
    </Header>
  );
}
