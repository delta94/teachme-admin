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

export interface IWMLineChartProps<T> {
  className?: string;
  data: T[];
  xKey: string;
  lineKeyPrefix: string;
  lines: { dataKey: string; stroke: string }[];
}

export default function WMLineChart<T extends {}>({
  className = '',
  data,
  xKey,
  lineKeyPrefix,
  lines,
}: IWMLineChartProps<T>) {
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
          <Tooltip />
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
