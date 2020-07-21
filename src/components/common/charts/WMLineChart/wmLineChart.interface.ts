export interface IWMLineChartItem {
  dataKey: string;
  stroke: string;
  tooltipLabel: string;
}

export interface IWMLineChartProps<T> {
  data: T[];
  xKey: string;
  lineKeyPrefix: string;
  lines: IWMLineChartItem[];
  className?: string;
  hasWMTooltip?: boolean;
  hasData?: boolean;
}
