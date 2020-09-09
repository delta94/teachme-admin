import React, { ReactElement, useEffect, useState } from 'react';

import { PieBarChart, PieBarSummary } from '../../charts';
import { IBar } from '../../charts/PieBarChart/pieBarChart.interface';
import WMCard from '../../WMCard';
import WMSkeleton from '../../WMSkeleton';

import { pluralizer } from '../../../../utils';

import { ICoursesTimeCompletionChart } from '../analytics.interface';
import { parseBucketsToPieBarSummary } from '../utils';

import AvgCompletionTimeLegend from './CourseTimeCompletionLegend';

interface IDuration {
  duration: string;
  units: string;
}

function getAverageCompletionTime(averageTimeInHours: number | undefined): IDuration | undefined {
  if (!averageTimeInHours) return undefined;

  const unit = Math.ceil(averageTimeInHours) < 24 ? 'hour' : 'day';
  const unitAmount = Math.ceil(
    Math.ceil(averageTimeInHours) < 24 ? averageTimeInHours : averageTimeInHours / 24,
  );

  return {
    duration: unitAmount.toString(),
    units: pluralizer(unit, unitAmount),
  };
}

function CoursesTimeCompletionChart({
  className,
  title,
  overview,
  isLoading = false,
}: ICoursesTimeCompletionChart): ReactElement {
  const [completionTimeAvg, setCompletionTimeAvg] = useState<IDuration | undefined>();
  const [bars, setBars] = useState<IBar[]>([]);

  useEffect(() => {
    if (overview?.completion_time?.avg) {
      const { completion_time } = overview;

      setCompletionTimeAvg(getAverageCompletionTime(completion_time.avg));

      if (completion_time.buckets.length)
        setBars(parseBucketsToPieBarSummary(completion_time.buckets));
    }

    return () => {
      setBars([]);
      setCompletionTimeAvg(undefined);
    };
  }, [overview]);

  // unmount only
  useEffect(
    () => () => {
      setCompletionTimeAvg(undefined);
      setBars([]);
    },
    [],
  );

  return (
    <WMCard title={title}>
      <WMSkeleton loading={isLoading} active paragraph={{ rows: 2 }}>
        <div className={className}>
          <PieBarSummary
            value={completionTimeAvg?.duration}
            unit={completionTimeAvg?.units ? ` ${completionTimeAvg?.units}` : ''}
          />
          <PieBarChart bars={bars} legendContent={AvgCompletionTimeLegend} />
        </div>
      </WMSkeleton>
    </WMCard>
  );
}

export default React.memo(CoursesTimeCompletionChart);
