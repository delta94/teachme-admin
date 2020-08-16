import React, { ReactElement } from 'react';

import WMCard from '../../WMCard';
import WMSkeleton from '../../WMSkeleton';
import { WMProgress, ProgressType, ProgressStatus } from '../../charts';

import { IQuizScoreData } from '../analytics.interface';

import classes from './style.module.scss';

export default function QuizScoreChart({
  overview,
  isEmpty,
  isLoading = false,
}: IQuizScoreData): ReactElement {
  const passmark = overview.passmark ?? 0;
  const average = Math.round(overview.avg_quiz_score) || 0;

  return (
    <WMCard title="Avg. Quiz Score" className={classes['course-average']}>
      <WMSkeleton loading={isLoading} active paragraph={{ rows: 1 }}>
        <div className={classes['course-average-content']}>
          <WMProgress
            className={classes['course-average-chart']}
            percent={!isEmpty && average ? average : 0}
            type={ProgressType.Circle}
            format={() => (isEmpty ? '- -' : average)}
            width={80}
            strokeWidth={10}
            status={average > passmark ? ProgressStatus.Success : ProgressStatus.Exception}
          />
          {
            <span className={classes['passmark']}>
              Passmark: <b>{!isEmpty ? passmark : '- -'}</b>
            </span>
          }
        </div>
      </WMSkeleton>
    </WMCard>
  );
}
