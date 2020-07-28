import React, { ReactElement, useEffect, useState } from 'react';

import { PieBarChart, PieBarSummary } from '../../charts';
import WMCard from '../../WMCard';
import { IBar } from '../../charts/PieBarChart/pieBarChart.interface';

import { IQuizCompletionRateChart } from '../analytics.interface';
import { calculatePercentages, convertPercentagesToPieBar } from '../utils';

import QuizCompletionRateLegend from './QuizCompletionRateLegend';

export default function QuizCompletionRateChart({
  className,
  title,
  overview: { users_passed, users_submitted },
}: IQuizCompletionRateChart): ReactElement {
  const [totalPercentages, setTotalPercentages] = useState<number>(0);
  const [bars, setBars] = useState<IBar[]>([]);

  useEffect(() => {
    if (users_passed && users_submitted)
      setTotalPercentages(calculatePercentages(users_passed, users_submitted));
  }, [users_passed, users_submitted]);

  useEffect(() => {
    if (totalPercentages)
      setBars([
        {
          value: convertPercentagesToPieBar(totalPercentages),
          legend: 'Users who completed a course',
          color: '#AFD7FF',
        },
      ]);
  }, [totalPercentages]);

  // unmount only
  useEffect(
    () => () => {
      setTotalPercentages(0);
      setBars([]);
    },
    [],
  );

  return (
    <WMCard title={title}>
      <div className={className}>
        <PieBarSummary
          value={totalPercentages as number}
          unit={'%'}
          text={` (${users_passed ?? 0} of ${users_submitted ?? 0} users)`}
        />
        <PieBarChart bars={bars} legendContent={QuizCompletionRateLegend} />
      </div>
    </WMCard>
  );
}
