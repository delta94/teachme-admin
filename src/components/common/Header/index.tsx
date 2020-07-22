import React, { ReactNode, ReactElement } from 'react';
import cc from 'classcat';

import classes from './style.module.scss';

export default function Header({
  title,
  className,
  titleClassName,
  children,
}: {
  title?: ReactNode;
  className?: string;
  titleClassName?: string;
  children?: ReactNode;
}): ReactElement {
  return (
    <header className={cc([classes.header, className])}>
      {title && <div className={cc([classes.title, titleClassName])}>{title}</div>}
      {children}
    </header>
  );
}
