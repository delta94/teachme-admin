import React, { ReactElement } from 'react';
import moment from 'moment';

import WMCard from '../../WMCard';
import WMLegend from '../../WMLegend';
import { WMLineChart } from '../../charts';
import { ICourseSummaryChart, ICourseByDay } from '../analytics.interface';

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
  const {
    title,
    data: { days, lines },
  } = summaryData;

  // TODO: remove this method and the usages after getting the data from the SDK
  const getLast7Days = () => {
    let result = [];
    for (var i = 0; i < 7; i++) {
      var d = new Date();
      d.setDate(d.getDate() - i);
      result.push(d);
    }
    return result;
  };

  // TODO: remove this method and the usages after getting the data from the SDK
  const daysToDates = () => {
    return days.map((dayData: ICourseByDay) => {
      const last7Days = getLast7Days();
      let date = moment(last7Days[dayData.day as number]).format('D/DD') as string;

      return {
        ...dayData,
        day: date,
      };
    });
  };

  return (
    <WMCard title={title}>
      <div className={classes['course-summary']}>
        <div className={classes['chart-legend']}>
          <WMLegend title="User Started" dotStatusColor="#F2B529">
            <LegendContent number={2580} description="52% of users with TeachMe access" />
          </WMLegend>
          <WMLegend title="User Completed" dotStatusColor="#8812FF">
            <LegendContent number={2130} description="47% of users who started courses" />
          </WMLegend>
        </div>
        <WMLineChart
          className={classes['course-summary-chart']}
          data={daysToDates() as ICourseByDay[]}
          xKey="day"
          lines={lines}
          lineKeyPrefix="course-summary"
          hasWMTooltip
        />
      </div>
    </WMCard>
  );
}
