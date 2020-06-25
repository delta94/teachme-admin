import React from 'react';
import cc from 'classcat';

import { IconSVG } from './iconsSVG';

import classes from './style.module.scss';

export default function Icon({ type, className }: { type: string; className?: string }) {
  const Component = IconSVG[type as keyof typeof IconSVG];

  return <span className={cc([classes.icon, type, className])}>{Component && <Component />}</span>;
}
