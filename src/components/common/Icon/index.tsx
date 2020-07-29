import React, { ReactElement } from 'react';
import cc from 'classcat';

import { IconSVG } from './iconsSVG';
import { IconType } from './icon.interface';
import classes from './style.module.scss';

export { IconType };

export default function Icon({
  type,
  className,
  ...otherProps
}: {
  type: string;
  className?: string;
  [key: string]: any;
}): ReactElement {
  const Component = IconSVG[type as keyof typeof IconSVG];

  return (
    <span className={cc(['wm-icon', classes.icon, type, className])} {...otherProps}>
      {Component && <Component />}
    </span>
  );
}
