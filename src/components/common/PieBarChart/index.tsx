import React from 'react';

import PieBarChartLegend from './Legend';
import classes from './style.module.scss';

export interface IBar {
  value: number;
  color?: string;
}

export interface IPiebarChart {
  height?: number | string;
  width?: number | string;
  totalValue: number;
  bars: Array<IBar>;
}

export default function PieBarChart({
  height,
  width,
  totalValue,
  bars,
  ...otherProps
}: IPiebarChart): React.ReactElement {
  return (
    <div className={classes['pie-bar-chart']} {...otherProps}>
      <div className={classes['pie-bar']} style={{ height, width }} {...otherProps}>
        {bars.map((bar, index) => (
          <PieBarChartLegend
            color="yellow"
            content={`${(bar.value / totalValue) * 100}%`}
            key={index}
          >
            <span
              className={classes['pie-bar-chunk']}
              style={{ width: `${(bar.value / totalValue) * 100}%`, backgroundColor: bar.color }}
            />
          </PieBarChartLegend>
        ))}
      </div>
    </div>
  );
}
