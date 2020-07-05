import React from 'react';

import { IPieBarLegendContent } from '../../PieBarChart/pieBarChart.interface';

export default function AvgCompletionTimeLegend({
  barValue,
  barLegend,
}: IPieBarLegendContent): React.ReactElement {
  return (
    <>
      <b>{barValue}</b> of the users completed the courses within {barLegend} mins
    </>
  );
}
