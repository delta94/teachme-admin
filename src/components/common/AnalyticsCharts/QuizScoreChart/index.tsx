import React, { ReactElement } from 'react';

import { isValidNumber } from '../../../../utils';

import WMCard from '../../WMCard';
import WMSkeleton from '../../WMSkeleton';
import { WMProgress, ProgressType, ProgressStatus } from '../../charts';

import { IQuizScoreData } from '../analytics.interface';

import classes from './style.module.scss';

export default function QuizScoreChart({
  overview,
  isLoading = false,
}: IQuizScoreData): ReactElement {
  const { avg_quiz_score: average, passmark } = overview;
  const hasValue = isValidNumber(average) || isValidNumber(passmark);

  return (
    <WMCard title="Avg. Quiz Score" className={classes['course-average']}>
      <WMSkeleton loading={isLoading} active paragraph={{ rows: 1 }}>
        <div className={classes['course-average-content']}>
          <WMProgress
            className={classes['course-average-chart']}
            percent={average ?? undefined}
            type={ProgressType.Circle}
            format={() => (hasValue ? parseInt(average.toFixed(0)) : '- -')}
            width={80}
            strokeWidth={10}
            status={
              hasValue && passmark && average > passmark
                ? ProgressStatus.Success
                : ProgressStatus.Exception
            }
          />
          {
            <span className={classes['passmark']}>
              Passmark: <b>{hasValue ? passmark : '- -'}</b>
            </span>
          }
        </div>
      </WMSkeleton>
    </WMCard>
  );
}
