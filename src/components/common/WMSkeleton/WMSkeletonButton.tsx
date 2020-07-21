import React, { ReactElement } from 'react';
import { SkeletonButtonProps } from 'antd/lib/skeleton/Button';
import { Skeleton } from 'antd';

import cc from 'classcat';

import classes from './style.module.scss';

export interface IWMSkeletonButton extends SkeletonButtonProps {
  className?: string;
}

export default function WMSkeletonButton({
  className,
  ...otherProps
}: IWMSkeletonButton): ReactElement {
  return (
    <Skeleton.Button
      className={cc([classes['wm-skeleton'], classes['avatar'], className])}
      {...otherProps}
    />
  );
}
