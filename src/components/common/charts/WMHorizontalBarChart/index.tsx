import React, { ReactElement } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

import { IQuizAnswers } from '../../../../constants/mocks/quizBarChart-mock';
import { useAppSkeleton } from '../../../../hooks/skeleton';

import WMSkeleton from '../../WMSkeleton';

import classes from './style.module.scss';

const colors = [
  '#006AF7',
  '#5FA8F3',
  '#AFD7FF',
  '#aff0ff',
  '#52D3B6',
  '#1A9479',
  '#B0D352',
  '#D3B652',
  '#d37052',
  '#D3526F',
];

const YAxisTick = ({
  index,
  payload: { value },
  x,
  y,
  bars,
}: {
  index: number;
  payload: { value: string };
  x: number;
  y: number;
  width: number;
  height: number;
  value: any;
  name: any;
  coordinate: number;
  bars: Array<any>;
}) => {
  const isCorrect = bars[index].isCorrect;

  return (
    <g>
      <text x={x} y={y} dominantBaseline="middle" textAnchor="end">
        {isCorrect && <tspan className={classes['check-mark']}>✔ </tspan>}
        {value}
      </text>
    </g>
  );
};

const BarLabel = ({
  x,
  y,
  width,
  height,
  value,
  totalValue,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  value: any;
  name: any;
  totalValue: number;
}) => {
  const percent = totalValue ? ((value / totalValue) * 100).toFixed(1) : 0;

  return (
    <text
      className={classes['label']}
      x={x + width + 8}
      y={y + height - 1.75}
      dominantBaseline="bottom"
    >
      <tspan>{percent}%</tspan>
      {` (${value})`}
    </text>
  );
};

export interface IWMHorizontalBarChart {
  readonly totalValue: number;
  readonly bars: Array<IQuizAnswers>;
}

export default function WMHorizontalBarChart({
  bars,
  totalValue,
}: IWMHorizontalBarChart): ReactElement {
  const appInit = useAppSkeleton();

  return (
    <div className={classes['wm-horizontal-bar-chart']}>
      <ResponsiveContainer
        width="75%"
        height={bars.length * 40}
        className={classes['bar-chart-container']}
      >
        {appInit ? (
          <BarChart data={bars} maxBarSize={16} layout={'vertical'}>
            <XAxis type={'number'} orientation={'bottom'} hide />
            <YAxis
              type={'category'}
              orientation={'left'}
              dataKey={'title'}
              tickLine={false}
              axisLine={{ stroke: 'transparent' }}
              interval={0}
              width={200}
              tick={(props) => <YAxisTick {...props} bars={bars} />}
            />
            <Bar
              dataKey="value"
              radius={[0, 16, 16, 0]}
              label={(props: any) => <BarLabel {...props} totalValue={totalValue} />}
            >
              {bars.map((entry, index) =>
                totalValue ? (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ) : (
                  <Cell key={`cell-${index}`} fill="#ccc" width={500} />
                ),
              )}
            </Bar>
          </BarChart>
        ) : (
          <WMSkeleton active paragraph={{ rows: 5 }} />
        )}
      </ResponsiveContainer>
    </div>
  );
}
