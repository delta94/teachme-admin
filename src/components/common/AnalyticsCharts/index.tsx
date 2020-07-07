import React, { ReactElement } from 'react';
import cc from 'classcat';

import WMCard from '../../common/WMCard';
import { IAnalyticsCharts } from './analytics.interface';
import CourseStatusChart from './CourseSummaryChart';
import CourseTimeCompletionChart from './CourseTimeCompletionChart';
import QuizCompletionRateChart from './QuizCompletionRateChart';

import classes from './style.module.scss';

export default function AnalyticsCharts({ data }: IAnalyticsCharts): ReactElement {
  const { summary, completion, quizCompletion } = data;

  return (
    <div className={classes.analytics}>
      <div className={cc([classes.graphs, classes['left-graphs']])}>
        <CourseStatusChart summaryData={summary} />
      </div>
      <div className={cc([classes.graphs, classes['right-graphs']])}>
        <CourseTimeCompletionChart completionData={completion} />
        <QuizCompletionRateChart quizCompletionData={quizCompletion} />
      </div>
    </div>
  );
}
