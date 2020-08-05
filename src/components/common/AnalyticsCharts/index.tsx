import React, { ReactElement } from 'react';
import cc from 'classcat';

import { CourseOverviewData } from '../../../walkme/models/course/panels';

import { IAnalyticsCharts } from './analytics.interface';
import CourseSummaryChart from './CourseSummaryChart';
import CourseTimeCompletionChart from './CourseTimeCompletionChart';
import QuizCompletionRateChart from './QuizCompletionRateChart';
import QuizScoreChart from './QuizScoreChart';

import classes from './style.module.scss';

export default function AnalyticsCharts({
  summaryChartTitle,
  timeCompletionTitle = 'Avg. Completion Time',
  quizCompletionTitle = 'Quiz Completion Rate',
  overview,
  isLoading = false,
}: IAnalyticsCharts): ReactElement {
  return (
    <div className={classes.analytics}>
      <div className={cc([classes.graphs, classes['left-graphs']])}>
        <CourseSummaryChart title={summaryChartTitle} overview={overview} isLoading={isLoading} />
      </div>
      <div className={cc([classes.graphs, classes['right-graphs']])}>
        <CourseTimeCompletionChart
          className={classes['line-graph']}
          title={timeCompletionTitle}
          overview={overview}
          isLoading={isLoading}
        />
        <div className={classes['quiz-graphs']}>
          <QuizCompletionRateChart
            className={classes['line-graph']}
            title={quizCompletionTitle}
            overview={overview}
            isLoading={isLoading}
          />
          {(overview as CourseOverviewData)?.passmark && (
            <QuizScoreChart
              isEmpty={overview && Object.keys(overview).length === 0}
              overview={overview as CourseOverviewData}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
