import React, { ReactElement, useEffect, useState } from 'react';

import { useCoursesContext } from '../../../../providers/CoursesContext';
import { CompletionGraphStats } from '../../../../walkme/models/overview/panels';

import WMCard from '../../WMCard';
import WMLegend from '../../WMLegend';
import { WMLineChart } from '../../charts';

import { parseCourseSummaryLegendData, formatMarkCompletionDate } from '../utils';
import { ICourseSummaryChart, ICourseSummaryLegendData } from '../analytics.interface';

import classes from './style.module.scss';

const LegendContent = ({ number, description }: { number: number; description?: string }) => {
  return (
    <div className={classes['chart-legend-content']}>
      <span className={classes['legend-number']}>{new Intl.NumberFormat().format(number)}</span>
      <span className={classes['legend-description']}>{description}</span>
    </div>
  );
};

export default function CourseSummaryChart({ summaryData }: ICourseSummaryChart): ReactElement {
  const [{ overview }, dispatch] = useCoursesContext();
  const [legendData, setLegendData] = useState<ICourseSummaryLegendData>();
  const [markCompletion, setMarkCompletion] = useState<CompletionGraphStats[]>([]);

  const { title } = summaryData;

  useEffect(() => {
    const { total_completion, total_users_accessed, mark_completion } = overview;

    if (total_completion && total_users_accessed)
      setLegendData(parseCourseSummaryLegendData({ total_completion, total_users_accessed }));

    if (mark_completion) setMarkCompletion(formatMarkCompletionDate(mark_completion, 'MM/DD'));
  }, [overview]);

  // unmount only
  useEffect(
    () => () => {
      setLegendData(undefined);
      setMarkCompletion([]);
    },
    [],
  );

  console.log('overview ', overview);

  return (
    <WMCard title={title}>
      <div className={classes['course-summary']}>
        <div className={classes['chart-legend']}>
          <WMLegend title="Users Started" dotStatusColor="#F2B529" hasData={Boolean(legendData)}>
            {legendData && (
              <LegendContent
                number={legendData.start_users}
                description={`${legendData.started_percentages}% of users with TeachMe access`}
              />
            )}
          </WMLegend>
          <WMLegend title="Users Completed" dotStatusColor="#8812FF" hasData={Boolean(legendData)}>
            {legendData && (
              <LegendContent
                number={legendData.completed_users}
                description={`${legendData.completed_percentages}% of users who started courses`}
              />
            )}
          </WMLegend>
        </div>
        <WMLineChart
          className={classes['course-summary-chart']}
          data={markCompletion}
          xKey="date"
          lines={[
            {
              dataKey: 'start_users',
              stroke: '#F2B529',
              tooltipLabel: 'Users started this course',
            },
            {
              dataKey: 'completed_users',
              stroke: '#8812FF',
              tooltipLabel: 'Users completed this course',
            },
          ]}
          lineKeyPrefix="course-summary"
          hasWMTooltip
          hasData={Boolean(markCompletion)}
        />
      </div>
    </WMCard>
  );
}
