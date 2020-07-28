import React, { ReactElement } from 'react';

import { PieBarChart, PieBarSummary } from '../../charts';
import WMCard from '../../WMCard';

import { ICoursesTimeCompletionChart } from '../analytics.interface';

import AvgCompletionTimeLegend from './CourseTimeCompletionLegend';

export default function CoursesTimeCompletionChart({
  className,
  completionData,
}: ICoursesTimeCompletionChart): ReactElement {
  const {
    title,
    data: { summaryLegend, summaryUnit, bars, totalValue },
  } = completionData;

  return (
    <WMCard title={title}>
      <div className={className}>
        <PieBarSummary value={summaryLegend} unit={` ${summaryUnit}`} />
        <PieBarChart bars={bars} totalValue={totalValue} legendContent={AvgCompletionTimeLegend} />
      </div>
    </WMCard>
  );
}
