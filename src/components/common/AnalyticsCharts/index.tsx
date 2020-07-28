import React, { ReactElement } from 'react';
import cc from 'classcat';

import { IAnalyticsCharts } from './analytics.interface';
import CourseSummaryChart from './CourseSummaryChart';
import CourseTimeCompletionChart from './CourseTimeCompletionChart';
import QuizCompletionRateChart from './QuizCompletionRateChart';
import QuizScoreChart from './QuizScoreChart';

import classes from './style.module.scss';

export default function AnalyticsCharts({ data, overview }: IAnalyticsCharts): ReactElement {
  const { summary, completion, quizCompletion, quizScore } = data;

  return (
    <div className={classes.analytics}>
      <div className={cc([classes.graphs, classes['left-graphs']])}>
        <CourseSummaryChart title={summary.title} overview={overview} />
      </div>
      <div className={cc([classes.graphs, classes['right-graphs']])}>
        <CourseTimeCompletionChart
          className={classes['line-graph']}
          title={completion.title}
          overview={overview}
        />
        <div className={classes['quiz-graphs']}>
          <QuizCompletionRateChart
            className={classes['line-graph']}
            title={quizCompletion.title}
            overview={overview}
          />
          {quizScore && <QuizScoreChart quizScoreData={quizScore} />}
        </div>
      </div>
    </div>
  );
}
