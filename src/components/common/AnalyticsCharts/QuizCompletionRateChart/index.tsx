import React, { ReactElement } from 'react';

import PieBarChart from '../../PieBarChart';
import PieBarSummary from '../../PieBarSummary';
import QuizCompletionRateLegend from './QuizCompletionRateLegend';

export interface IQuizCompletionRateChart {
  data: any; // TODO: create a properly interface instead of using any
}

export default function QuizCompletionRateChart({ data }: IQuizCompletionRateChart): ReactElement {
  return (
    <>
      <PieBarSummary
        value={data.summaryLegend}
        unit={data.summaryUnit}
        text={` (${data.bars[0].value} of ${data.totalValue} users)`}
      />
      <PieBarChart
        bars={data.bars}
        totalValue={data.totalValue}
        legendContent={QuizCompletionRateLegend}
      />
    </>
  );
}
