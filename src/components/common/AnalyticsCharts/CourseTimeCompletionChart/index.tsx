import React, { ReactElement } from 'react';

import PieBarChart from '../../PieBarChart';
import AvgCompletionTimeLegend from './CourseTimeCompletionLegend';
import PieBarSummary from '../../PieBarSummary';
import WMCard from '../../WMCard';
import { ICoursesTimeCompletionChart } from '../analytics.interface';

export default function CoursesTimeCompletionChart({
  completionData,
}: ICoursesTimeCompletionChart): ReactElement {
  const {
    title,
    data: { summaryLegend, summaryUnit, bars, totalValue },
  } = completionData;

  return (
    <WMCard title={title}>
      <PieBarSummary value={summaryLegend} unit={` ${summaryUnit}`} />
      <PieBarChart bars={bars} totalValue={totalValue} legendContent={AvgCompletionTimeLegend} />
    </WMCard>
  );
}
