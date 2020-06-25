import React, { ReactElement } from 'react';

import TimeFilter from '../filters/time-filter';
import Header from '../header';

import classes from './style.module.scss';

export default function ScreenHeader({
  title,
  children,
  hideTimeFilter,
}: {
  title: ReactElement | string;
  hideTimeFilter?: boolean;
  children?: ReactElement | undefined;
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
