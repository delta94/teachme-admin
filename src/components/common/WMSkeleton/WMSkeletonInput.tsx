import React, { ReactElement } from 'react';
import { SkeletonInputProps } from 'antd/lib/skeleton/Input';
import { Skeleton } from 'antd';

import cc from 'classcat';

import classes from './style.module.scss';

export interface IWMSkeletonInput extends SkeletonInputProps {
  className?: string;
}

export default function WMSkeletonInput({
  className,
  ...otherProps
}: IWMSkeletonInput): ReactElement {
  return (
    <Skeleton.Input
      className={cc([classes['wm-skeleton'], classes['input'], className])}
      {...otherProps}
    />
  );
}
