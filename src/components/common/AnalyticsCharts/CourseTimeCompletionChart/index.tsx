import React, { ReactElement, useEffect, useState } from 'react';

import { PieBarChart, PieBarSummary } from '../../charts';
import WMCard from '../../WMCard';
import { IBar } from '../../charts/PieBarChart/pieBarChart.interface';

import { ICoursesTimeCompletionChart } from '../analytics.interface';
import { parseBucketsToPieBarSummary } from '../utils';

import AvgCompletionTimeLegend from './CourseTimeCompletionLegend';

export default function CoursesTimeCompletionChart({
  className,
  title,
  overview: { completion_time },
}: ICoursesTimeCompletionChart): ReactElement {
  const [completionTimeAvg, setCompletionTimeAvg] = useState<number>();
  const [bars, setBars] = useState<IBar[]>([]);

  useEffect(() => {
    if (completion_time) {
      setCompletionTimeAvg(completion_time.avg ? completion_time.avg.toFixed(0) : 0);

      if (completion_time.buckets.length)
        setBars(parseBucketsToPieBarSummary(completion_time.buckets));
    }
  }, [completion_time]);

  // unmount only
  useEffect(
    () => () => {
      setCompletionTimeAvg(0);
      setBars([]);
    },
    [],
  );

  return (
    <WMCard title={title}>
      <div className={className}>
        <PieBarSummary value={completionTimeAvg as number} unit=" min" />
        <PieBarChart bars={bars} legendContent={AvgCompletionTimeLegend} />
      </div>
    </WMCard>
  );
}
