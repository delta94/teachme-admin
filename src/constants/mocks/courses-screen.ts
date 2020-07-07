import courseSummaryMock from './courseSummaryChartMock';
import courseCompletionChartMock from './courseCompletionChartMock';
import courseCompletionRateChartMock from './courseCompletionRateChartMock';

export const coursesMockData = {
  title: 'Courses',
  analytics: {
    summary: {
      title: 'Users Started / Completed Courses',
      data: courseSummaryMock,
    },
    completion: {
      title: 'Avg. Completion Time',
      data: courseCompletionChartMock,
    },
    quizCompletion: {
      title: 'Quiz Completion Rate',
      data: courseCompletionRateChartMock,
    },
  },
  CoursesTable: {
    title: 'Courses',
  },
};
