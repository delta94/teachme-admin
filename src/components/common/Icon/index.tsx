import React, { ReactElement } from 'react';
import cc from 'classcat';

import { IconSVG } from './iconsSVG';
import { IconType } from './icon.interface';
import classes from './style.module.scss';

export { IconType };

export default function Icon({
  type,
  className,
}: {
  type: string;
  className?: string;
}): ReactElement {
  const Component = IconSVG[type as keyof typeof IconSVG];

  return <span className={cc([classes.icon, type, className])}>{Component && <Component />}</span>;
}
