import React, { ReactNode, ReactElement } from 'react';
import cc from 'classcat';

import classes from './style.module.scss';

export default function Header({
  title,
  className,
  titleClassName,
  children,
  ...otherProps
}: {
  title?: ReactNode;
  className?: string;
  titleClassName?: string;
  children?: ReactNode;
  [key: string]: any;
}): ReactElement {
  return (
    <header className={cc([classes.header, className])} {...otherProps}>
      {title && <div className={cc([classes.title, titleClassName])}>{title}</div>}
      {children}
    </header>
  );
}
