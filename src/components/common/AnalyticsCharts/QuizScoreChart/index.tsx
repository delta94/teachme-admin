import React, { ReactElement } from 'react';

import { courseMockData } from '../../../../constants/mocks/course-screen';
import { useAppSkeleton } from '../../../../hooks/skeleton';
import { ProgressType, ProgressStatus } from '../../charts/WMProgress/wmProgress.interface';
import WMCard from '../../WMCard';
import { IQuizScoreData } from '../analytics.interface';
import { WMProgress } from '../../charts';
import WMSkeleton from '../../WMSkeleton';

import classes from './style.module.scss';

const defaultQuizData = courseMockData.analytics.quizData;

export default function QuizScoreChart({ quizData, isEmpty }: IQuizScoreData): ReactElement {
  // TODO: remove mock data after getting quizData
  const {
    data: { mock_average = 0, mock_passmark = 0 },
  } = defaultQuizData;

  const appInit = useAppSkeleton();

  return (
    <WMCard title="Avg. Quiz Score" className={classes['course-average']}>
      {appInit ? (
        <div className={classes['course-average-content']}>
          <WMProgress
            className={classes['course-average-chart']}
            percent={!isEmpty && mock_average ? mock_average : 0}
            type={ProgressType.Circle}
            format={() => (isEmpty ? '- -' : mock_average)}
            width={80}
            strokeWidth={10}
            status={
              mock_average > mock_passmark ? ProgressStatus.Success : ProgressStatus.Exception
            }
          />
          {
            <span className={classes['passmark']}>
              Passmark: <b>{!isEmpty ? mock_passmark : '- -'}</b>
            </span>
          }
        </div>
      ) : (
        <WMSkeleton active paragraph={{ rows: 1 }} />
      )}
    </WMCard>
  );
}
