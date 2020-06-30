import React, { ReactElement } from 'react';

import WMCard from '../../../common/WMCard';
import WMLegend from '../../../common/WMLegend';
import { WMLineChart } from '../../../common/charts';

import classes from './style.module.scss';

interface ICourseByDay {
  day: string | number;
  'Users Started'?: number;
  'Users Completed'?: number;
}

const days = [
  { day: 1, 'Users Started': 4000, 'Users Completed': 2400 },
  { day: 2, 'Users Started': 3000, 'Users Completed': 1398 },
  { day: 3, 'Users Started': 2000, 'Users Completed': 9800 },
  { day: 4, 'Users Started': 2780, 'Users Completed': 3908 },
  { day: 5, 'Users Started': 1890, 'Users Completed': 4800 },
  { day: 6, 'Users Started': 2390, 'Users Completed': 3800 },
  { day: 7, 'Users Started': 3490, 'Users Completed': 4300 },
];

const lines = [
  {
    dataKey: 'Users Started',
    stroke: '#F2B529',
  },
  {
    dataKey: 'Users Completed',
    stroke: '#8812FF',
  },
];

const LegendContent = ({ number, description }: { number: number; description?: string }) => {
  return (
    <div className={classes['chart-legend-content']}>
      <span className={classes['legend-number']}>{new Intl.NumberFormat().format(number)}</span>
      <span className={classes['legend-description']}>{description}</span>
    </div>
  );
};

export default function CourseStatusChart({ title }: { title?: ReactElement | string }) {
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
