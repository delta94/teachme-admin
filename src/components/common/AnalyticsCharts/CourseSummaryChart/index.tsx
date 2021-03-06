import React, { ReactElement, useEffect, useState } from 'react';

import { CompletionGraphStats } from '../../../../walkme/models/overview/panels';

import WMCard from '../../WMCard';
import WMLegend from '../../WMLegend';
import { WMLineChart } from '../../charts';

import { parseCourseSummaryLegendData, formatMarkCompletionDate } from '../utils';
import { ICourseSummaryLegendData } from '../analytics.interface';

import classes from './style.module.scss';

const LegendContent = React.memo(
  ({ number, description }: { number: number; description?: string }) => (
    <div className={classes['chart-legend-content']}>
      <span className={classes['legend-number']}>{new Intl.NumberFormat().format(number)}</span>
      <span className={classes['legend-description']}>{description}</span>
    </div>
  ),
);

LegendContent.displayName = 'LegendContent';

const CourseSummaryChart = React.memo(
  ({
    title,
    overview,
    isLoading = false,
    isSingleCourse,
  }: {
    title: string;
    overview?: any;
    isLoading?: boolean;
    isSingleCourse?: boolean;
  }): ReactElement => {
    const [legendData, setLegendData] = useState<ICourseSummaryLegendData>();
    const [markCompletion, setMarkCompletion] = useState<CompletionGraphStats[]>([]);

    useEffect(() => {
      if (overview) {
        const { total_completion, total_users_accessed, mark_completion } = overview;

        if (total_completion || total_users_accessed || mark_completion) {
          if (total_completion && total_users_accessed)
            setLegendData(parseCourseSummaryLegendData({ total_completion, total_users_accessed }));

          if (mark_completion)
            setMarkCompletion(formatMarkCompletionDate(mark_completion, 'MM/DD'));
        }
      }
    }, [overview]);

    // unmount only
    useEffect(
      () => () => {
        setLegendData(undefined);
        setMarkCompletion([]);
      },
      [],
    );

    return (
      <WMCard title={title}>
        <div className={classes['course-summary']}>
          <div className={classes['chart-legend']}>
            <WMLegend
              title="Users Started"
              dotStatusColor="#F2B529"
              hasData={Boolean(legendData)}
              isLoading={isLoading}
            >
              {legendData && (
                <LegendContent
                  number={legendData.start_users}
                  description={`${legendData.start_percentages ?? 0}% of users with TeachMe access`}
                />
              )}
            </WMLegend>
            <WMLegend
              title="Users Completed"
              dotStatusColor="#8812FF"
              hasData={Boolean(legendData)}
              isLoading={isLoading}
            >
              {legendData && (
                <LegendContent
                  number={legendData.completed_users}
                  description={`${
                    legendData.completed_percentages ?? 0
                  }% of users who started courses`}
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
                tooltipLabel: `Users started ${isSingleCourse ? 'this course' : 'courses'}`,
              },
              {
                dataKey: 'completed_users',
                stroke: '#8812FF',
                tooltipLabel: `Users completed ${isSingleCourse ? 'this course' : 'courses'}`,
              },
            ]}
            lineKeyPrefix="course-summary"
            hasWMTooltip
            hasData={Boolean(markCompletion.length)}
            isLoading={isLoading}
          />
        </div>
      </WMCard>
    );
  },
);

CourseSummaryChart.displayName = 'CourseSummaryChart';

export default CourseSummaryChart;
