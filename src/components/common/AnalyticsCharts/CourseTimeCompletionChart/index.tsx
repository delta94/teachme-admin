import React, { ReactElement } from 'react';

import PieBarChart from '../../PieBarChart';
import AvgCompletionTimeLegend from './CourseTimeCompletionLegend';
import PieBarSummary from '../../PieBarSummary';

export interface ICoursesTimeCompletionChart {
  data: any; // TODO: create a properly interface instead of using any
}

export default function CoursesTimeCompletionChart({
  data,
}: ICoursesTimeCompletionChart): ReactElement {
  return (
    <>
      <PieBarSummary value={data.summaryLegend} unit={` ${data.summaryUnit}`} />
      <PieBarChart
        bars={data.bars}
        totalValue={data.totalValue}
        legendContent={AvgCompletionTimeLegend}
      />
    </>
  );
}
