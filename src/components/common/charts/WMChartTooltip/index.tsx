import React, { ReactElement } from 'react';
import cc from 'classcat';

import StatusDot, { DotType } from '../../StatusDot';

import classes from './style.module.scss';

interface IChartItem {
  color: string;
  label: string;
  value: string;
}

interface IWMChartTooltip {
  chartItems: IChartItem[];
  data: any;
}

export default function WMChartTooltip({ chartItems, data }: IWMChartTooltip): ReactElement {
  return (
    <div className={cc([classes['wm-chart-tooltip']])}>
      <span className={classes['title']}>{data.label}</span>
      {chartItems.map((item: IChartItem, index: number) => (
        <div key={`wm-chart-tooltip-legend-${index}`} className={classes['legend']}>
          <StatusDot
            type={DotType.Custom}
            dotColor={item.color}
            className={classes['status-dot']}
          />
          <span>
            <b>{item.value} </b>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
