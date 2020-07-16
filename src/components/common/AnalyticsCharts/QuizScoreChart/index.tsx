import React, { ReactElement } from 'react';

import { ProgressType, ProgressStatus } from '../../charts/WMProgress/wmProgress.interface';
import WMCard from '../../WMCard';
import { IQuizScoreData } from '../analytics.interface';
import { WMProgress } from '../../charts';

import classes from './style.module.scss';

export default function QuizScoreChart({ quizScoreData }: IQuizScoreData): ReactElement {
  const {
    title,
    data: { average = 0, passmark = 0 },
  } = quizScoreData;

  const hasData = quizScoreData.data;

  return (
    <WMCard title={title} className={classes['course-average']}>
      <div className={classes['course-average-content']}>
        <WMProgress
          className={classes['course-average-chart']}
          percent={average}
          type={ProgressType.Circle}
          format={hasData ? () => average : () => '- -'}
          width={80}
          strokeWidth={10}
          status={average > passmark ? ProgressStatus.Success : ProgressStatus.Exception}
        />
        {hasData && (
          <span className={classes['passmark']}>
            Passmark: <b>{passmark}</b>
          </span>
        )}
      </div>
    </WMCard>
  );
}
