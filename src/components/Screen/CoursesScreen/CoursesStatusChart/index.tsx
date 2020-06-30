import React, { ReactElement } from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip } from 'recharts';

import WMCard from '../../../common/WMCard';
import WMLegend from '../../../common/WMLegend';

import classes from './style.module.scss';

const data = [
  { course: 'Course A', 'Users Started': 4000, 'Users Completed': 2400, amt: 2400 },
  { course: 'Course B', 'Users Started': 3000, 'Users Completed': 1398, amt: 2210 },
  { course: 'Course C', 'Users Started': 2000, 'Users Completed': 9800, amt: 2290 },
  { course: 'Course D', 'Users Started': 2780, 'Users Completed': 3908, amt: 2000 },
  { course: 'Course E', 'Users Started': 1890, 'Users Completed': 4800, amt: 2181 },
  { course: 'Course F', 'Users Started': 2390, 'Users Completed': 3800, amt: 2500 },
  { course: 'Course G', 'Users Started': 3490, 'Users Completed': 4300, amt: 2100 },
];

const LegendContent = ({ number, description }: { number: number; description?: string }) => {
  return (
    <div className={classes['chart-legend-content']}>
      <span className={classes['legend-number']}>{new Intl.NumberFormat().format(number)}</span>
      <span className={classes['legend-description']}>{description}</span>
    </div>
  );
};

export default function CoursesStatusChart({ title }: { title?: ReactElement | string }) {
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
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="course" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Line type="monotone" dataKey="Users Started" stroke="#F2B529" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Users Completed" stroke="#8812FF" />
        </LineChart>
      </div>
    </WMCard>
  );
}
