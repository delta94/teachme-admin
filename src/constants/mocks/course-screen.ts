import courseSummaryMock from './courseSummaryChartMock';
import courseCompletionChartMock from './courseCompletionChartMock';
import courseCompletionRateChartMock from './courseCompletionRateChartMock';
import courseOutlineTable from './courseOutlineMock';
import { quizBarChartMock } from './quizBarChart-mock';

export const courseMockData = {
  title: 'Course',
  analytics: {
    summary: {
      title: 'Users Started / Completed Course',
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
    quizData: {
      title: 'Avg. Quiz Score',
      data: {
        mock_average: 82,
        mock_passmark: 80,
      },
    },
  },
  courseOutlineTableData: courseOutlineTable,
  quizData: quizBarChartMock,
};
