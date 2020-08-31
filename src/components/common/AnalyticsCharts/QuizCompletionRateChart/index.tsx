import React, { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { CourseOverviewData } from '../../../../walkme/models';

import CourseQuizEmptyState from '../../../Screen/CourseScreen/CourseQuizEmptyState';

import { PieBarChart, PieBarSummary } from '../../charts';
import { IBar } from '../../charts/PieBarChart/pieBarChart.interface';
import WMCard from '../../WMCard';
import WMSkeleton from '../../WMSkeleton';

import { IQuizCompletionRateChart } from '../analytics.interface';
import { calculatePercentages } from '../utils';

import QuizCompletionRateLegend from './QuizCompletionRateLegend';

export default function QuizCompletionRateChart({
  className,
  title,
  overview,
  isLoading = false,
}: IQuizCompletionRateChart): ReactElement {
  const { courseId } = useParams();
  const [totalPercentages, setTotalPercentages] = useState<number>();
  const [bars, setBars] = useState<IBar[]>([]);
  const singleCourseHasQuiz = courseId && (overview as CourseOverviewData).hasQuiz;

  useEffect(() => {
    if (overview) {
      const { users_passed, users_submitted } = overview;
      setTotalPercentages(calculatePercentages(users_passed, users_submitted));
    }
  }, [overview]);

  useEffect(() => {
    if (totalPercentages) {
      setBars([
        {
          value: totalPercentages,
          legend: 'Users who completed a course',
        },
      ]);
    }

    return () => setBars([]);
  }, [totalPercentages]);

  // unmount only
  useEffect(
    () => () => {
      setTotalPercentages(undefined);
      setBars([]);
    },
    [],
  );

  return (
    <WMCard title={title}>
      <WMSkeleton loading={isLoading} active paragraph={{ rows: 2 }}>
        <div className={className}>
          {!courseId || singleCourseHasQuiz ? (
            <>
              <PieBarSummary
                value={totalPercentages as number}
                unit="%"
                text={` (${overview?.users_passed ?? 0} of ${
                  overview?.users_submitted ?? 0
                } users)`}
              />
              <PieBarChart bars={bars} legendContent={QuizCompletionRateLegend} />
            </>
          ) : (
            <CourseQuizEmptyState />
          )}
        </div>
      </WMSkeleton>
    </WMCard>
  );
}
