import React, { ReactElement, useState, useEffect } from 'react';

import { useAppContext } from '../../../../providers/AppContext';
import { ProgressType, ProgressStatus } from '../../charts/WMProgress/wmProgress.interface';
import WMCard from '../../WMCard';
import { IQuizScoreData } from '../analytics.interface';
import { WMProgress } from '../../charts';
import WMSkeleton from '../../WMSkeleton';

import classes from './style.module.scss';

export default function QuizScoreChart({ quizScoreData }: IQuizScoreData): ReactElement {
  const {
    title,
    data: { average = 0, passmark = 0 },
  } = quizScoreData;

  const [appState, appDispatch] = useAppContext();
  const { isUpdating } = appState;
  const [appInit, setAppInit] = useState(false);

  useEffect(() => {
    if (!isUpdating && !appInit) setAppInit(true);
  }, [isUpdating, appInit]);
  const isEmpty = Object.keys(quizScoreData.data).length === 0;

  return (
    <WMCard title={title} className={classes['course-average']}>
      {appInit ? (
        <div className={classes['course-average-content']}>
          <WMProgress
            className={classes['course-average-chart']}
            percent={isEmpty && average}
            type={ProgressType.Circle}
            format={() => (isEmpty ? average : '- -')}
            width={80}
            strokeWidth={10}
            status={average > passmark ? ProgressStatus.Success : ProgressStatus.Exception}
          />
          {isEmpty && (
            <span className={classes['passmark']}>
              Passmark: <b>{passmark}</b>
            </span>
          )}
        </div>
      ) : (
        <WMSkeleton active paragraph={{ rows: 1 }} />
      )}
    </WMCard>
  );
}
