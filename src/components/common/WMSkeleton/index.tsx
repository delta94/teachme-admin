import React, { ReactElement } from 'react';
import { SkeletonProps } from 'antd/lib/skeleton';
import { Skeleton } from 'antd';
import cc from 'classcat';

import WMSkeletonInput from './WMSkeletonInput';
import WMSkeletonAvatar from './WMSkeletonAvatar';
import WMSkeletonButton from './WMSkeletonButton';

import classes from './style.module.scss';

export interface IWMSkeleton extends SkeletonProps {
  className?: string;
}

export { WMSkeletonInput };
export { WMSkeletonAvatar };
export { WMSkeletonButton };

export default function WMSkeleton({ className, ...otherProps }: IWMSkeleton): ReactElement {
  return <Skeleton className={cc([classes['wm-skeleton'], className])} {...otherProps} />;
}
