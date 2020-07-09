import React from 'react';
import StatusDot, { DotType } from '../../StatusDot';

interface IChartItem {
  color: string;
  label: string;
}

interface IChartTooltip {
  chartItems: IChartItem[];
  data: any;
}

export default function LineChartTooltip({ chartItems, data }: IChartTooltip) {
  console.log(data);
  return (
    <div>
      <span>{data.label}</span>
      {chartItems.map((item: IChartItem) => (
        <div className={'chart-legend'}>
          <StatusDot type={DotType.Custom} dotColor={item.color} className={'chart-status-dot'} />
          <div>{item.label}</div>
        </div>
      ))}
    </div>
  );
}
