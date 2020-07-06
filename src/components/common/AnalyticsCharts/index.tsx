import React, { ReactElement } from 'react';
import cc from 'classcat';

import WMCard from '../../common/WMCard';
import CourseStatusChart from './CourseSummaryChart';
import CourseTimeCompletionChart from './CourseTimeCompletionChart';
import QuizCompletionRateChart from './QuizCompletionRateChart';

import classes from './style.module.scss';

// TODO: create a properly interface instead of using any
interface IAnalyticsCharts {
  data: any;
  courseTimeCompletionData: any;
  quizCompletionRateData: any;
}

export default function AnalyticsCharts({
  data,
  courseTimeCompletionData,
  quizCompletionRateData,
}: IAnalyticsCharts): ReactElement {
  const { graph_1, graph_2, graph_3 } = data;

  return (
    <div className={classes.analytics}>
      <div className={cc([classes.graphs, classes['left-graphs']])}>
        <CourseStatusChart title={graph_1.title} />
      </div>
      <div className={cc([classes.graphs, classes['right-graphs']])}>
        <WMCard title={graph_2.title}>
          <CourseTimeCompletionChart data={courseTimeCompletionData} />
        </WMCard>
        <WMCard title={graph_3.title}>
          <QuizCompletionRateChart data={quizCompletionRateData} />
        </WMCard>
      </div>
    </div>
  );
}
