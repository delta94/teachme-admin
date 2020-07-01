import React, { ReactElement } from 'react';
import cc from 'classcat';

import { coursesMockData } from '../../../constants/mocks/courses-mock';
import { data as tableData, columns } from '../../../mocks/tableMockData';

import WMCard from '../../common/WMCard';
import WMTable from '../../common/WMTable';
import ScreenHeader from '../../common/ScreenHeader';
import CoursesTimeCompletionChart from '../../common/CourseTimeCompletionChart';
import QuizCompletionRateChart from '../../common/QuizCompletionRateChart';

import classes from './style.module.scss';

export default function CoursesScreen(): ReactElement {
  const {
    title: mainTitle,
    analytics: { graph_1, graph_2, graph_3 },
    CoursesTable,
  } = coursesMockData;

  return (
    <>
      <ScreenHeader title={mainTitle} />
      <div className={classes.analytics}>
        <div className={cc([classes.graphs, classes['left-graphs']])}>
          <WMCard title={graph_1.title} />
        </div>
        <div className={cc([classes.graphs, classes['right-graphs']])}>
          <WMCard title={graph_2.title}>
            <CoursesTimeCompletionChart />
          </WMCard>
          <WMCard title={graph_3.title}>
            <QuizCompletionRateChart />
          </WMCard>
        </div>
      </div>
      <WMCard
        title={`${tableData.length} ${CoursesTable.title}`}
        subTitle="Courses will appear to your users in the order below."
      >
        <WMTable data={tableData} columns={columns} />
      </WMCard>
    </>
  );
}
