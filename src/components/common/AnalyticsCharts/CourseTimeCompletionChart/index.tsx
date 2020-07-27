import React, { ReactElement, useState, useEffect } from 'react';

import { PieBarChart } from '../../charts';
import { PieBarSummary } from '../../charts';
import WMCard from '../../WMCard';
import WMSkeleton from '../../WMSkeleton';
import { ICoursesTimeCompletionChart } from '../analytics.interface';
import { useAppContext } from '../../../../providers/AppContext';

import AvgCompletionTimeLegend from './CourseTimeCompletionLegend';

export default function CoursesTimeCompletionChart({
  className,
  completionData,
}: ICoursesTimeCompletionChart): ReactElement {
  const {
    title,
    data: { summaryLegend, summaryUnit, bars, totalValue },
  } = completionData;

  const [appState, appDispatch] = useAppContext();
  const { isUpdating } = appState;
  const [appInit, setAppInit] = useState(false);

  useEffect(() => {
    if (!isUpdating && !appInit) setAppInit(true);
  }, [isUpdating, appInit]);

  return (
    <WMCard title={title}>
      {appInit ? (
        <div className={className}>
          <PieBarSummary value={summaryLegend} unit={` ${summaryUnit}`} />
          <PieBarChart
            bars={bars}
            totalValue={totalValue}
            legendContent={AvgCompletionTimeLegend}
          />
        </div>
      ) : (
        <WMSkeleton active paragraph={{ rows: 2 }} />
      )}
    </WMCard>
  );
}
