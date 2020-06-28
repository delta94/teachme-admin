import React from 'react';
import classes from './style.module.scss';

export enum DotType {
  Success = 'success',
  Failure = 'failure',
}

export default function StatusDot({ type }: { type: DotType }): JSX.Element {
  return <span className={`${classes.dot} ${classes[type]}`} />;
}
