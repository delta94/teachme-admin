import React from 'react';
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import WMChartTooltip from '../WMChartTooltip';

export interface IWMLineChartProps<T> {
  data: T[];
  xKey: string;
  lineKeyPrefix: string;
  lines: { dataKey: string; stroke: string; tooltipLabel: string }[];
  className?: string;
  isWMTooltip?: boolean;
}

export default function WMLineChart<T extends {}>({
  className = '',
  data,
  xKey,
  lineKeyPrefix,
  lines,
  isWMTooltip,
}: IWMLineChartProps<T>) {
  const renderWMTooltip = ({
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
        <WMChartTooltip
          data={{
            payload,
            label,
            active,
          }}
          chartItems={lines.map((line, index) => {
            const { stroke, tooltipLabel } = line;
            return {
              value: payload[index].value,
              label: tooltipLabel,
              color: stroke,
            };
          })}
        />
      );
    }
  };

  return (
    <div className={className}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey={xKey} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          {isWMTooltip ? <Tooltip content={(data: any) => renderWMTooltip(data)} /> : <Tooltip />}
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
