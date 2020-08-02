import React, { ReactElement, useEffect, useState } from 'react';

import { useAppSkeleton } from '../../../../hooks/skeleton';

import { PieBarChart, PieBarSummary } from '../../charts';
import WMCard from '../../WMCard';
import { IBar } from '../../charts/PieBarChart/pieBarChart.interface';

import WMSkeleton from '../../WMSkeleton';
import { ICoursesTimeCompletionChart } from '../analytics.interface';
import { parseBucketsToPieBarSummary } from '../utils';

import AvgCompletionTimeLegend from './CourseTimeCompletionLegend';

export default function CoursesTimeCompletionChart({
  className,
  title,
  overview,
}: ICoursesTimeCompletionChart): ReactElement {
  const [completionTimeAvg, setCompletionTimeAvg] = useState<number>(0);
  const [bars, setBars] = useState<IBar[]>([]);
  const appInit = useAppSkeleton();

  useEffect(() => {
    if (overview?.completion_time) {
      const { completion_time } = overview;

      setCompletionTimeAvg(completion_time.avg ? parseInt(completion_time.avg.toFixed(0)) : 0);

      if (completion_time.buckets.length)
        setBars(parseBucketsToPieBarSummary(completion_time.buckets));
    }
  }, [overview]);

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
      {appInit ? (
        <div className={className}>
          <PieBarSummary value={completionTimeAvg as number} unit=" min" />
          <PieBarChart bars={bars} legendContent={AvgCompletionTimeLegend} />
        </div>
      ) : (
        <WMSkeleton active paragraph={{ rows: 2 }} />
      )}
    </WMCard>
  );
}
