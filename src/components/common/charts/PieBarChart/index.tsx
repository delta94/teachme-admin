import React from 'react';
// @ts-ignore
import mix from 'mix-css-color';

import PieBarChartLegend from './Legend';
import { IPieBarChart } from './pieBarChart.interface';

import classes from './style.module.scss';

function generateColors(colorStart: string, colorEnd: string, steps: number) {
  return new Array(steps).fill(undefined).map((item, index) => {
    const step = (index / steps) * 100;
    return mix(colorStart, colorEnd, step).hex;
  });
}

export default function PieBarChart({
  height,
  width,
  totalValue = 100,
  bars,
  legendContent: LegendContent,
  colorStart = '#006af7',
  colorEnd = '#afd7ff',
  ...otherProps
}: IPieBarChart): React.ReactElement {
  const generatedColors = generateColors(colorStart, colorEnd, bars.length);

  return (
    <div className={classes['pie-bar-chart']} {...otherProps}>
      <div className={classes['pie-bar']} style={{ height, width }} {...otherProps}>
        {bars.map((bar, index) => {
          const barValue = bars.length ? `${(bar.value / totalValue) * 100}%` : '0%';
          const barLegend = bar.legend;
          const barColor = bar.color ?? generatedColors[index];
          const legendContent = (
            <LegendContent
              barValue={Math.round(parseFloat(barValue))}
              barLegend={barLegend}
              totalValue={totalValue}
              barColor={barColor}
            />
          );

          return (
            <PieBarChartLegend color={barColor} content={legendContent} key={index}>
              <span
                className={classes['pie-bar-chunk']}
                style={{
                  width: `${barValue}`, // using literals to prevent stylelint(value-keyword-case) error
                  backgroundColor: `${barColor}`, // using literals to prevent stylelint(value-keyword-case) error
                }}
              />
            </PieBarChartLegend>
          );
        })}
      </div>
    </div>
  );
}
