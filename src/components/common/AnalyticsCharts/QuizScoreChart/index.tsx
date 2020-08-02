import React, { ReactElement } from 'react';

import { courseMockData } from '../../../../constants/mocks/course-screen';
import { useAppSkeleton } from '../../../../hooks/skeleton';
import { ProgressType, ProgressStatus } from '../../charts/WMProgress/wmProgress.interface';
import WMCard from '../../WMCard';
import { IQuizScoreData } from '../analytics.interface';
import { WMProgress } from '../../charts';
import WMSkeleton from '../../WMSkeleton';

import classes from './style.module.scss';

export default function QuizScoreChart({ overview, isEmpty }: IQuizScoreData): ReactElement {
  const appInit = useAppSkeleton();
  const { avg_quiz_score: average = 0, passmark = 0 } = overview;

  return (
    <WMCard title="Avg. Quiz Score" className={classes['course-average']}>
      {appInit ? (
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
      ) : (
        <WMSkeleton active paragraph={{ rows: 1 }} />
      )}
    </WMCard>
  );
}
