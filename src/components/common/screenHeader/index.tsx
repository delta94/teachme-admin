import React, { ReactElement } from 'react';

import Header from '../header';

import classes from './style.module.scss';

export default function ScreenHeader({
  title,
  children,
}: {
  title: ReactElement | string;
  children?: ReactElement | undefined;
}) {
  return (
    <Header
      className={classes['screen-header']}
      titleClassName={classes['screen-header-title']}
      title={title}
    >
      {children}
    </Header>
  );
}
