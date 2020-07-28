import React, { ReactElement } from 'react';
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { useAppSkeleton } from '../../../../hooks/skeleton';
import { ITooltipContent } from '../charts.interface';
import WMChartTooltip from '../WMChartTooltip';
import WMSkeleton from '../../WMSkeleton';

import { IWMLineChartItem, IWMLineChartProps } from './wmLineChart.interface';
import EmptyLineChart from './EmptyLineChart';

import classes from './style.module.scss';

const renderWMTooltip = ({ data, lines }: { data: ITooltipContent; lines: IWMLineChartItem[] }) => {
  const { payload, label, active } = data;
  if (active) {
    return (
      <WMChartTooltip
        data={{
          payload,
          label,
          active,
        }}
        chartItems={lines.map(({ stroke, tooltipLabel }, index) => ({
          value: payload[index].value,
          label: tooltipLabel,
          color: stroke,
        }))}
      />
    );
  }
};

export default function WMLineChart<T extends {}>({
  className,
  data,
  xKey,
  lineKeyPrefix,
  lines,
  hasWMTooltip,
  hasData,
}: IWMLineChartProps<T>): ReactElement {
  const appInit = useAppSkeleton();

  return (
    <div className={className}>
      {appInit ? (
        <>
          {hasData ? (
            <ResponsiveContainer>
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey={xKey} />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                {hasWMTooltip ? (
                  <Tooltip content={(data: any) => renderWMTooltip({ data, lines })} />
                ) : (
                  <Tooltip />
                )}
                {lines.map(({ dataKey, stroke }, index) => (
                  <Line
                    key={`${lineKeyPrefix}-${index}`}
                    type="monotone"
                    dataKey={dataKey}
                    stroke={stroke}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <EmptyLineChart />
          )}
        </>
      ) : (
        <WMSkeleton active paragraph={{ rows: 6 }} className={classes['line-chart-skeleton']} />
      )}
    </div>
  );
}
