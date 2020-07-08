import React, { ReactNode, ReactElement } from 'react';
import cc from 'classcat';

import classes from './style.module.scss';

export default function ControlsWrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}): ReactElement {
  return <div className={cc([classes['controls-wrapper'], className])}>{children}</div>;
}
