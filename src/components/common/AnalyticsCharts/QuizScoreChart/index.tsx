import React, { ReactElement } from 'react';

import { isValidNumber } from '../../../../utils';

import WMCard from '../../WMCard';
import WMSkeleton from '../../WMSkeleton';
import { WMProgress, ProgressType, ProgressStatus } from '../../charts';
import CourseQuizEmptyState from '../../../Screen/CourseScreen/CourseQuizEmptyState';

import { IQuizScoreData } from '../analytics.interface';

import classes from './style.module.scss';

function QuizScoreChart({ overview, isLoading = false }: IQuizScoreData): ReactElement {
  const { avg_quiz_score, passmark } = overview;

  // `avg_quiz_score` is required in type `CourseOverviewData`, and returns `null` when data is missing
  const average = avg_quiz_score ? Math.round(avg_quiz_score) : undefined;
  const hasValue = isValidNumber(average) || isValidNumber(passmark);

  return (
    <WMCard title="Avg. Quiz Score" className={classes['course-average']}>
      <WMSkeleton loading={isLoading} active paragraph={{ rows: 1 }}>
        <div className={classes['course-average-content']}>
          {hasValue ? (
            <>
              <WMProgress
                className={classes['course-average-chart']}
                percent={average}
                type={ProgressType.Circle}
                format={() => average ?? 0}
                width={80}
                strokeWidth={10}
                status={
                  passmark && average! > passmark
                    ? ProgressStatus.Success
                    : ProgressStatus.Exception
                }
              />
              <span className={classes['passmark']}>
                Passmark: <b>{passmark}</b>
              </span>
            </>
          ) : (
            <CourseQuizEmptyState />
          )}
        </div>
      </WMSkeleton>
    </WMCard>
  );
}

export default React.memo(QuizScoreChart);
