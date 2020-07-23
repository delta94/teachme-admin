import React, { ReactElement } from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, ResponsiveContainer } from 'recharts';

import emptyChartMockData from './emptyChartMock';

export default function EmptyLineChart(): ReactElement {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart
        width={730}
        height={250}
        data={emptyChartMockData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Line type="monotone" dataKey="pv" dot={false} stroke="#c1c1c1" isAnimationActive={false} />
        <Line type="monotone" dataKey="uv" dot={false} stroke="#c1c1c1" isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
