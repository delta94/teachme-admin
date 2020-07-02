import React, { ReactNode } from 'react';

import WMCard from '../../WMCard';
import WMLegend from '../../WMLegend';
import { WMLineChart } from '../../charts';
import { days, lines } from '../../../../constants/mocks/courseSummaryChartMock';

import classes from './style.module.scss';

interface ICourseByDay {
  day: string | number;
  'Users Started'?: number;
  'Users Completed'?: number;
}

const LegendContent = ({ number, description }: { number: number; description?: string }) => {
  return (
    <div className={classes['chart-legend-content']}>
      <span className={classes['legend-number']}>{new Intl.NumberFormat().format(number)}</span>
      <span className={classes['legend-description']}>{description}</span>
    </div>
  );
};

export default function CourseStatusChart({ title }: { title?: ReactNode }) {
  return (
    <WMCard title={title}>
      <div className={classes['courses-status']}>
        <div className={classes['chart-legend']}>
          <WMLegend title="User Started" dotStatusColor="#F2B529">
            <LegendContent number={2580} description="52% of users with TeachMe access" />
          </WMLegend>
          <WMLegend title="User Completed" dotStatusColor="#8812FF">
            <LegendContent number={2130} description="47% of users who started courses" />
          </WMLegend>
        </div>
        <WMLineChart
          className={classes['course-status-chart']}
          data={days as ICourseByDay[]}
          xKey="day"
          lines={lines}
          lineKeyPrefix="course-status"
        />
      </div>
    </WMCard>
  );
}
