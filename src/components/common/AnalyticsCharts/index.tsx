import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import cc from 'classcat';

import { CourseOverviewData } from '../../../walkme/models/course';

import { IAnalyticsCharts } from './analytics.interface';
import CourseSummaryChart from './CourseSummaryChart';
import CourseTimeCompletionChart from './CourseTimeCompletionChart';
import QuizCompletionRateChart from './QuizCompletionRateChart';
import QuizScoreChart from './QuizScoreChart';

import classes from './style.module.scss';

function AnalyticsCharts({
  summaryChartTitle,
  timeCompletionTitle = 'Avg. Completion Time',
  quizCompletionTitle = 'Quiz Completion Rate',
  overview,
  isLoading = false,
}: IAnalyticsCharts): ReactElement {
  const { courseId } = useParams();

  return (
    <div className={classes.analytics}>
      <div className={cc([classes.graphs, classes['left-graphs']])}>
        <CourseSummaryChart
          title={summaryChartTitle}
          overview={overview}
          isLoading={isLoading}
          isSingleCourse={!!courseId}
        />
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
          {Boolean(courseId) && (
            <QuizScoreChart overview={overview as CourseOverviewData} isLoading={isLoading} />
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(AnalyticsCharts);
