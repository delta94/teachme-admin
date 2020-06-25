import React, { ReactElement } from 'react';
import cc from 'classcat';

import TimeFilter from '../filters/time-filter';

import classes from './style.module.scss';

export default function Header({
  title,
  className,
  titleClassName,
  children,
  showTimeFilter,
}: {
  title: ReactElement | string;
  className?: string;
  titleClassName?: string;
  children?: string | ReactElement | undefined;
  showTimeFilter?: boolean;
}) {
  return (
    <header className={cc([classes.header, className])}>
      {showTimeFilter && <TimeFilter />}
      <div className={cc([classes.title, titleClassName])}>{title}</div>
      {children}
    </header>
  );
}
