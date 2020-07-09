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
import LineChartTooltip from './LineChartTooltip';

export interface IWMLineChartProps<T> {
  className?: string;
  data: T[];
  xKey: string;
  lineKeyPrefix: string;
  lines: { dataKey: string; stroke: string; tooltipLabel: string }[];
}

export default function WMLineChart<T extends {}>({
  className = '',
  data,
  xKey,
  lineKeyPrefix,
  lines,
}: IWMLineChartProps<T>) {
  const CustomTooltip = ({
    payload,
    label,
    active,
  }: {
    payload: any[];
    label: string;
    active: boolean;
  }) => {
    if (active) {
      return (
        <LineChartTooltip
          data={{
            payload,
            label,
            active,
          }}
          chartItems={lines.map((line, index) => {
            const { dataKey, stroke, tooltipLabel } = line;
            return {
              title: label,
              label: `${payload[index].value} ${tooltipLabel}`,
              color: stroke,
            };
          })}
        />
      );
    }

    return null;
  };

  console.log('xKey ', xKey);
  return (
    <div className={className}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey={xKey} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          {/* TODO: 
            after getting the SDK and integrating with time-filter
            use https://recharts.org/en-US/examples/CustomContentOfTooltip 
          */}
          <Tooltip content={(data: any) => <CustomTooltip {...data} />} />
          {lines.map((line, index) => {
            const { dataKey, stroke } = line;
            return (
              <Line
                key={`${lineKeyPrefix}-${index}`}
                type="monotone"
                dataKey={dataKey}
                stroke={stroke}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
