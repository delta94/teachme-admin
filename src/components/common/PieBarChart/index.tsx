import React, { useRef } from 'react';
// @ts-ignore
import mix from 'mix-css-color';

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
  colorStart?: string;
  colorEnd?: string;
}

function generateColors(colorStart: string, colorEnd: string, steps: number) {
  return new Array(steps).fill(undefined).map((item, index) => {
    const step = (index / steps) * 100;
    return mix(colorStart, colorEnd, step).hex;
  });
}

export default function PieBarChart({
  height,
  width,
  totalValue,
  bars,
  colorStart = '#006af7',
  colorEnd = '#afd7ff',
  ...otherProps
}: IPiebarChart): React.ReactElement {
  const generatedColors = useRef(generateColors(colorStart, colorEnd, bars.length));

  return (
    <div className={classes['pie-bar-chart']} {...otherProps}>
      <div className={classes['pie-bar']} style={{ height, width }} {...otherProps}>
        {bars.map((bar, index) => (
          <PieBarChartLegend
            color={bar.color ?? generatedColors.current[index]}
            content={`${(bar.value / totalValue) * 100}%`}
            key={index}
          >
            <span
              className={classes['pie-bar-chunk']}
              style={{
                width: `${(bar.value / totalValue) * 100}%`,
                backgroundColor: bar.color ?? generatedColors.current[index],
              }}
            />
          </PieBarChartLegend>
        ))}
      </div>
    </div>
  );
}
