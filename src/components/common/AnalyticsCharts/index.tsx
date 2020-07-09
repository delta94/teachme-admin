import React, { ReactElement } from 'react';
import cc from 'classcat';

import { IAnalyticsCharts } from './analytics.interface';
import CourseStatusChart from './CourseSummaryChart';
import CourseTimeCompletionChart from './CourseTimeCompletionChart';
import QuizCompletionRateChart from './QuizCompletionRateChart';
import QuizScoreChart from './QuizScoreChart';

import classes from './style.module.scss';

export default function AnalyticsCharts({ data }: IAnalyticsCharts): ReactElement {
  const { summary, completion, quizCompletion, quizScore } = data;

  return (
    <div className={classes.analytics}>
      <div className={cc([classes.graphs, classes['left-graphs']])}>
        <CourseStatusChart summaryData={summary} />
      </div>
      <div className={cc([classes.graphs, classes['right-graphs']])}>
        <CourseTimeCompletionChart className={classes['line-graph']} completionData={completion} />
        <div className={classes['quiz-graphs']}>
          <QuizCompletionRateChart
            className={classes['line-graph']}
            quizCompletionData={quizCompletion}
          />
          {quizScore && <QuizScoreChart quizScoreData={quizScore} />}
        </div>
      </div>
    </div>
  );
}
