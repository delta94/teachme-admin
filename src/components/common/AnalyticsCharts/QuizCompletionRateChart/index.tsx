import React, { ReactElement, useEffect, useState } from 'react';

import WMCard from '../../WMCard';
import WMSkeleton from '../../WMSkeleton';
import { PieBarChart, PieBarSummary } from '../../charts';
import { IQuizCompletionRateChart } from '../analytics.interface';
import { useAppContext } from '../../../../providers/AppContext';

import QuizCompletionRateLegend from './QuizCompletionRateLegend';

export default function QuizCompletionRateChart({
  className,
  quizCompletionData,
}: IQuizCompletionRateChart): ReactElement {
  const {
    title,
    data: { summaryLegend, summaryUnit, bars, totalValue },
  } = quizCompletionData;

  const [appState, appDispatch] = useAppContext();
  const { isUpdating } = appState;
  const [appInit, setAppInit] = useState(false);

  useEffect(() => {
    if (!isUpdating && !appInit) setAppInit(true);
  }, [isUpdating, appInit]);

  return (
    <WMCard title={title}>
      {appInit ? (
        <div className={className}>
          <PieBarSummary
            value={summaryLegend}
            unit={summaryUnit}
            text={` (${bars[0].value} of ${totalValue} users)`}
          />
          <PieBarChart
            bars={bars}
            totalValue={totalValue}
            legendContent={QuizCompletionRateLegend}
          />
        </div>
      ) : (
        <WMSkeleton active paragraph={{ rows: 2 }} />
      )}
    </WMCard>
  );
}
