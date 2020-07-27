import React, { ReactElement, useEffect, useState } from 'react';
import moment from 'moment';

import { useCoursesContext } from '../../../../providers/CoursesContext';

import WMCard from '../../WMCard';
import WMLegend from '../../WMLegend';
import { WMLineChart } from '../../charts';
import { ICourseSummaryChart, ICourseByDate } from '../analytics.interface';

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
  // const { mark_completion, total_completion,  } = overview;
  const [legendData, setLegendData] = useState();

  const {
    title,
    data: { days, lines },
  } = summaryData;

  useEffect(() => {
    if (overview.total_completion && overview.total_users_accessed) {
      // const { total_completion, total_users_accessed } = overview;
      // const user_started_percentages =
      //   overview.total_completion.start_users! / overview.total_users_accessed;
      // const user_completed_percentages =
      //   overview.total_completion.start_users / total_users_accessed;

      console.log('CourseSummaryChart total_completion ', overview.total_completion);
      // console.log('CourseSummaryChart total_completion ', user_started_percentages);
    }
  }, [overview]);

  // const formatToDateDisplay = () =>
  //   mark_completion.map(
  //     (item: any): ICourseByDate => {
  //       const displayDate = moment(item.date).format('D/DD') as string;

  //       return {
  //         ...item,
  //         date: displayDate,
  //       };
  //     },
  //   );

  return (
    <WMCard title={title}>
      <div className={classes['course-summary']}>
        <div className={classes['chart-legend']}>
          <WMLegend title="Users Started" dotStatusColor="#F2B529" hasData={Boolean(overview)}>
            <LegendContent
              number={0}
              //TODO: calc %
              description="52% of users with TeachMe access"
            />
          </WMLegend>
          <WMLegend title="Users Completed" dotStatusColor="#8812FF" hasData={Boolean(overview)}>
            <LegendContent
              number={0}
              //TODO: calc %
              description="47% of users who started courses"
            />
          </WMLegend>
        </div>
        <WMLineChart
          className={classes['course-summary-chart']}
          data={overview.mark_completion}
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
          hasData={Boolean(overview)}
        />
      </div>
    </WMCard>
  );
}
