import React, { ReactElement } from 'react';
import { Progress } from 'antd';
import cc from 'classcat';

import { IWMProgress, ProgressType } from './wmProgress.interface';

import classes from './style.module.scss';

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
