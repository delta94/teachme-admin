import React, { ReactElement } from 'react';
import { AvatarProps } from 'antd/lib/skeleton/Avatar';
import { Skeleton } from 'antd';

import cc from 'classcat';

import classes from './style.module.scss';

export interface IWMSkeletonAvatar extends AvatarProps {
  className?: string;
}

export default function WMSkeletonAvatar({
  className,
  ...otherProps
}: IWMSkeletonAvatar): ReactElement {
  return (
    <Skeleton.Avatar
      className={cc([classes['wm-skeleton'], classes['avatar'], className])}
      {...otherProps}
    />
  );
}
