import React from 'react';
import cc from 'classcat';

import classes from './style.module.scss';

export enum DotType {
  Success = 'success',
  Failure = 'failure',
  Disable = 'disable',
  Custom = 'custom',
}

export default function StatusDot({
  type,
  dotColor,
  className,
}: {
  type: DotType;
  dotColor?: string;
  className?: string;
}): React.ReactElement {
  const isCustomDotStatus = type === DotType.Custom && dotColor;
  const customStyle = isCustomDotStatus ? { backgroundColor: dotColor } : undefined;

  return <span style={customStyle} className={cc([classes.dot, classes[type], className])} />;
}
