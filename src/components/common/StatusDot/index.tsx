import React from 'react';
import classes from './style.module.scss';
import cc from 'classcat';

export enum DotType {
  Success = 'success',
  Failure = 'failure',
}

export default function StatusDot({ type }: { type: DotType }): JSX.Element {
  return <span className={cc([classes.dot, classes[type]])} />;
}