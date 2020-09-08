import React, { ReactElement } from 'react';

import { IPieBarLegendContent } from '../../charts/PieBarChart/pieBarChart.interface';

export default function AvgCompletionTimeLegend({
  barValue,
  barLegend,
}: IPieBarLegendContent): ReactElement {
  return (
    <>
      <b>{barValue}</b> {barLegend}
    </>
  );
}
