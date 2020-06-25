import React, { ReactElement } from 'react';
import cc from 'classcat';

import classes from './style.module.scss';

export default function Header({
  title,
  className,
  titleClassName,
  children,
}: {
  title: ReactElement | string;
  className?: string;
  titleClassName?: string;
  children?: string | ReactElement | undefined;
}) {
  return (
    <header className={cc([classes.header, className])}>
      <div className={cc([classes.title, titleClassName])}>{title}</div>
      {children}
    </header>
  );
}
