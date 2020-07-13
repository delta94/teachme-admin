import React, { ReactElement } from 'react';

import { PieBarChart, PieBarSummary } from '../../charts';
import WMCard from '../../WMCard';
import { IQuizCompletionRateChart } from '../analytics.interface';
import QuizCompletionRateLegend from './QuizCompletionRateLegend';

export default function QuizCompletionRateChart({
  className,
  quizCompletionData,
}: IQuizCompletionRateChart): ReactElement {
  const {
    title,
    data: { summaryLegend, summaryUnit, bars, totalValue },
  } = quizCompletionData;

  return (
    <WMCard title={title}>
      <div className={className}>
        <PieBarSummary
          value={summaryLegend}
          unit={summaryUnit}
          text={` (${bars[0].value} of ${totalValue} users)`}
        />
        <PieBarChart bars={bars} totalValue={totalValue} legendContent={QuizCompletionRateLegend} />
      </div>
    </WMCard>
  );
}
