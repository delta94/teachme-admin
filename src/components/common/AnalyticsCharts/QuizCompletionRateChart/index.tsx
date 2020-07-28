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
  overview,
}: IQuizCompletionRateChart): ReactElement {
  const [totalPercentages, setTotalPercentages] = useState<number>(0);
  const [bars, setBars] = useState<IBar[]>([]);

  useEffect(() => {
    if (overview) {
      const { users_passed, users_submitted } = overview;

      if (users_passed && users_submitted)
        setTotalPercentages(calculatePercentages(users_passed, users_submitted));
    }
  }, [overview]);

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
          text={` (${overview?.users_passed ?? 0} of ${overview?.users_submitted ?? 0} users)`}
        />
        <PieBarChart bars={bars} legendContent={QuizCompletionRateLegend} />
      </div>
    </WMCard>
  );
}
