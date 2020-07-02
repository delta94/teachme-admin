import React, { ReactElement } from 'react';

import courseCompletionRateChartMock from '../../../constants/mocks/courseCompletionRateChartMock';

import PieBarChart from '../../common/PieBarChart';
import PieBarSummary from '../../common/PieBarSummary';
import QuizCompletionRateLegend from './QuizCompletionRateLegend';

export default function QuizCompletionRateChart(): ReactElement {
  return (
    <>
      <PieBarSummary
        value={courseCompletionRateChartMock.summaryLegend}
        unit={courseCompletionRateChartMock.summaryUnit}
        text={` (${courseCompletionRateChartMock.bars[0].value} of ${courseCompletionRateChartMock.totalValue} users)`}
      />
      <PieBarChart
        bars={courseCompletionRateChartMock.bars}
        totalValue={courseCompletionRateChartMock.totalValue}
        legendContent={QuizCompletionRateLegend}
      />
    </>
  );
}
