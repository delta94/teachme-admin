import React, { ReactElement } from 'react';
import { Progress } from 'antd';
import { ProgressProps } from 'antd/lib/progress';
import cc from 'classcat';

import classes from './style.module.scss';

export interface IWMProgress extends ProgressProps {
  className?: string;
}

export default function WMProgress({ className, ...otherProps }: IWMProgress): ReactElement {
  return <Progress className={cc([classes['wm-progress'], className])} {...otherProps} />;
}
