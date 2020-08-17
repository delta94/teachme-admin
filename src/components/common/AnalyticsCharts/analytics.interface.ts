import {
  CompletionGraphStats,
  AllCoursesOverviewResponse,
  CourseOverviewData,
} from '../../../walkme/models';

export interface IAnalyticsCharts {
  summaryChartTitle: string;
  timeCompletionTitle?: string;
  quizCompletionTitle?: string;
  overview?: AllCoursesOverviewResponse | CourseOverviewData;
  isLoading?: boolean;
}

export interface ICoursesTimeCompletionChart {
  className?: string;
  title: string;
  overview?: AllCoursesOverviewResponse | CourseOverviewData;
  isLoading?: boolean;
}

export interface IQuizCompletionRateChart {
  className?: string;
  title: string;
  overview?: AllCoursesOverviewResponse | CourseOverviewData;
  isLoading?: boolean;
}

export interface IQuizScoreData {
  overview: CourseOverviewData;
  isLoading?: boolean;
}

export interface ICourseSummaryLegendData extends Omit<CompletionGraphStats, 'date'> {
  start_users: number;
  completed_users: number;
  completed_percentages: number;
  start_percentages: number;
}
