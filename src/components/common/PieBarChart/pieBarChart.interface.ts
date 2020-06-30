import React from 'react';

export interface IBar {
  value: number;
  legend: string;
  color?: string;
}

export interface IPiebarChart {
  height?: number | string;
  width?: number | string;
  totalValue: number;
  bars: Array<IBar>;
  legendContent: React.ComponentType<IPieBarLegendContent>;
  colorStart?: string;
  colorEnd?: string;
}

export interface ILegend {
  color: string;
  content: React.ReactElement | string;
}

export interface IPieBarLegend {
  color: string;
  content: React.ReactElement | string;
  children: React.ReactElement;
}

export interface IPieBarLegendContent {
  barValue?: number | string;
  totalValue?: number | string;
  barLegend?: string;
  barColor?: string;
}
