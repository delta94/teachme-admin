import React, { ReactElement, useEffect, useState } from 'react';

import { PieBarChart, PieBarSummary } from '../../charts';
import { IBar } from '../../charts/PieBarChart/pieBarChart.interface';
import WMCard from '../../WMCard';
import WMSkeleton from '../../WMSkeleton';

import { ICoursesTimeCompletionChart } from '../analytics.interface';
import { parseBucketsToPieBarSummary } from '../utils';

import AvgCompletionTimeLegend from './CourseTimeCompletionLegend';

const CoursesTimeCompletionChart = React.memo(
  ({
    className,
    title,
    overview,
    isLoading = false,
  }: ICoursesTimeCompletionChart): ReactElement => {
    const [completionTimeAvg, setCompletionTimeAvg] = useState<number>();
    const [bars, setBars] = useState<IBar[]>([]);

    useEffect(() => {
      if (overview?.completion_time) {
        const { completion_time } = overview;

        setCompletionTimeAvg(
          completion_time.avg ? parseInt(completion_time.avg.toFixed(0)) : undefined,
        );

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
        <WMSkeleton loading={isLoading} active paragraph={{ rows: 2 }}>
          <div className={className}>
            <PieBarSummary value={completionTimeAvg} unit=" hours" />
            <PieBarChart bars={bars} legendContent={AvgCompletionTimeLegend} />
          </div>
        </WMSkeleton>
      </WMCard>
    );
  },
);

CoursesTimeCompletionChart.displayName = 'CoursesTimeCompletionChart';

export default CoursesTimeCompletionChart;
