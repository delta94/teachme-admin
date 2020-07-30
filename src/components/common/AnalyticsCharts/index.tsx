import React, { ReactElement } from 'react';
import cc from 'classcat';

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
  quizData,
  overview,
}: IAnalyticsCharts): ReactElement {
  return (
    <div className={classes.analytics}>
      <div className={cc([classes.graphs, classes['left-graphs']])}>
        <CourseSummaryChart title={summaryChartTitle} overview={overview} />
      </div>
      <div className={cc([classes.graphs, classes['right-graphs']])}>
        <CourseTimeCompletionChart
          className={classes['line-graph']}
          title={timeCompletionTitle}
          overview={overview}
        />
        <div className={classes['quiz-graphs']}>
          <QuizCompletionRateChart
            className={classes['line-graph']}
            title={quizCompletionTitle}
            overview={overview}
          />
          {quizData && (
            <QuizScoreChart
              isEmpty={Object.keys(quizData).length === 0}
              quizData={{
                average: 0, // overview.average
                passmark: quizData.properties.passmark,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
