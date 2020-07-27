import React, { ReactElement } from 'react';
import moment from 'moment';

import { useCoursesContext } from '../../../../providers/CoursesContext';

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
  const [{ overview }, dispatch] = useCoursesContext();
  console.log('CourseSummaryChart overview ', overview);

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

  const hasData = Boolean(summaryData.data.days.length);

  const getUsersCount = (key: string): number =>
    summaryData.data.days.reduce(
      (
        total: number,
        dayStats: {
          [label: string]: number;
        },
      ): number => total + dayStats[key],
      0,
    );

  return (
    <WMCard title={title}>
      <div className={classes['course-summary']}>
        <div className={classes['chart-legend']}>
          <WMLegend title="Users Started" dotStatusColor="#F2B529" hasData={hasData}>
            <LegendContent
              number={getUsersCount('Users Started')}
              //TODO: calc %
              description="52% of users with TeachMe access"
            />
          </WMLegend>
          <WMLegend title="Users Completed" dotStatusColor="#8812FF" hasData={hasData}>
            <LegendContent
              number={getUsersCount('Users Completed')}
              //TODO: calc %
              description="47% of users who started courses"
            />
          </WMLegend>
        </div>
        <WMLineChart
          className={classes['course-summary-chart']}
          data={daysToDates() as ICourseByDay[]}
          xKey="day"
          lines={lines}
          lineKeyPrefix="course-summary"
          hasWMTooltip
          hasData={hasData}
        />
      </div>
    </WMCard>
  );
}
