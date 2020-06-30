import React, { ReactElement } from 'react';
import cc from 'classcat';

import TimeFilter from '../filters/TimeFilter';

import classes from './style.module.scss';

export default function Header({
  title,
  className,
  titleClassName,
  children,
  showTimeFilter,
}: {
  title?: ReactElement | string;
  className?: string;
  titleClassName?: string;
  children?: string | ReactElement;
  showTimeFilter?: boolean;
}) {
  return (
    <header className={cc([classes.header, className])}>
      {showTimeFilter && <TimeFilter />}
      {title && <div className={cc([classes.title, titleClassName])}>{title}</div>}
      {children}
    </header>
  );
}
