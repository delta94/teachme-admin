import React, { ReactElement } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

import { useAppSkeleton } from '../../../../hooks/skeleton';

import Icon, { IconType } from '../../Icon';
import WMSkeleton from '../../WMSkeleton';

import classes from './style.module.scss';

export interface IQuizAnswers {
  readonly title: string;
  readonly value: number;
  readonly isCorrect: boolean;
}

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

  /**
   * using foreignObject to add text style manipulation
   * https://developer.mozilla.org/en-US/docs/Web/SVG/Element/foreignObject
   */

  return (
    <g>
      <foreignObject x={-110} y={y - 10} width="300" height="25">
        <div className={classes['answer-option-wrapper']}>
          {isCorrect && <Icon className={classes['check-mark']} type={IconType.VCircle} />}
          <span title={value} className={classes['answer-option']}>
            {value}
          </span>
        </div>
      </foreignObject>
    </g>
  );
};

const BarLabel = ({
  x,
  y,
  width,
  height,
  value,
  totalResponses,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  value: any;
  name: any;
  totalResponses: number;
}) => {
  const percent = totalResponses ? Math.round(100 * (value / totalResponses)) : '0';

  return (
    <text
      className={classes['label']}
      x={x + width + 8}
      y={y + height - 1.75}
      dominantBaseline="bottom"
    >
      <tspan>{value && !percent ? '< 1' : percent}</tspan>
      {`% (${value})`}
    </text>
  );
};

export interface IWMHorizontalBarChart {
  readonly bars: Array<IQuizAnswers>;
  readonly totalResponses: number;
}

export default function WMHorizontalBarChart({
  bars,
  totalResponses,
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
              label={(props: any) => <BarLabel {...props} totalResponses={totalResponses} />}
            >
              {bars.map((entry, index) =>
                entry.value ? (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ) : (
                  <Cell
                    className={classes['empty-bar-cell']}
                    key={`cell-${index}`}
                    fill="#ccc"
                    width={10}
                  />
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
