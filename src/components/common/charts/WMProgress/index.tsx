import React, { ReactElement } from 'react';
import { Progress } from 'antd';
import cc from 'classcat';

import { IWMProgress, ProgressType, ProgressStatus } from './wmProgress.interface';

import classes from './style.module.scss';

export type { IWMProgress };
export { ProgressType, ProgressStatus };

export default function WMProgress({
  className,
  type = ProgressType.Line,
  status,
  ...otherProps
}: IWMProgress): ReactElement {
  return (
    <Progress
      className={cc([classes['wm-progress'], className])}
      status={status}
      type={type}
      {...otherProps}
    />
  );
}
