import React from 'react';
import classes from './style.module.scss';
import cc from 'classcat';
import { Tooltip } from 'antd';

export interface IBar {
  amount: number;
  color?: string;
}

export interface IPiebarChart {
  height?: number | string;
  width?: number | string;
  totalAmount?: number;
  bars?: Array<IBar>;
}

const myBars = [
  { amount: 65, color: '#AFD7FF' },
  { amount: 25, color: '#5FA8F3' },
  { amount: 10, color: '#006AF7' },
];

export default function PieBarChart({
  height,
  width,
  totalAmount = 100,
  bars = myBars,
  ...otherProps
}: IPiebarChart): JSX.Element {
  return (
    <div className={classes['pie-bar-chart']} {...otherProps}>
      <div className={classes['pie-bar']} style={{ height, width }} {...otherProps}>
        {bars.map((bar, index) => (
          <Tooltip title={`${(bar.amount / totalAmount) * 100}%`} key={index}>
            <span
              className={classes['pie-bar-chunk']}
              style={{ width: `${(bar.amount / totalAmount) * 100}%`, backgroundColor: bar.color }}
            />
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
