import React, { ReactElement } from 'react';

import courseCompletionChartMock from '../../../constants/mocks/courseCompletionChartMock';

import PieBarChart from '../../common/PieBarChart';
import AvgCompletionTimeLegend from './CourseTimeCompletionLegend';
import PieBarSummary from '../../common/PieBarSummary';

export default function CoursesTimeCompletionChart(): ReactElement {
  return (
    <>
      <PieBarSummary
        value={courseCompletionChartMock.summaryLegend}
        unit={` ${courseCompletionChartMock.summaryUnit}`}
      />
      <PieBarChart
        bars={courseCompletionChartMock.bars}
        totalValue={courseCompletionChartMock.totalValue}
        legendContent={AvgCompletionTimeLegend}
      />
    </>
  );
}
