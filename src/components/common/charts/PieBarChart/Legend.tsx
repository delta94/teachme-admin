import React from 'react';

import StatusDot, { DotType } from '../../StatusDot';
import WMPopover from '../../WMPopover';

import { ILegend, IPieBarLegend } from './pieBarChart.interface';
import classes from './style.module.scss';

function Legend({ color, content, ...otherProps }: ILegend): React.ReactElement {
  return (
    <div className={classes['legend']} {...otherProps}>
      <StatusDot
        type={DotType.Custom}
        dotColor={color}
        className={classes['pie-bar-legend-status-dot']}
      />
      <div>{content}</div>
    </div>
  );
}

export default function PieBarChartLegend({
  color,
  content,
  children,
  ...otherProps
}: IPieBarLegend): React.ReactElement {
  return (
    <WMPopover content={<Legend color={color} content={content} />} {...otherProps}>
      {children}
    </WMPopover>
  );
}
