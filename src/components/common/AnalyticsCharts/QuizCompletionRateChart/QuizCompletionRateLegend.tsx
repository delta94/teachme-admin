import React from 'react';

import { IPieBarLegendContent } from '../../charts/PieBarChart/pieBarChart.interface';

export default function QuizCompletionRateLegend({
  barValue,
}: IPieBarLegendContent): React.ReactElement {
  return (
    <>
      <b>{barValue}%</b> of users completed a course
    </>
  );
}
