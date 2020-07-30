import { CompletionGraphStats } from '../../../walkme/models';

export interface IAnalyticsCharts {
  summaryChartTitle: string;
  timeCompletionTitle?: string;
  quizCompletionTitle?: string;
  quizData?: any;
  overview?: any;
}

// TODO: create a properly interface instead of using any
export interface ICourseSummaryChart {
  summaryData: any;
}

export interface ICoursesTimeCompletionChart {
  className?: string;
  title: string;
  overview?: any;
}

export interface IQuizCompletionRateChart {
  className?: string;
  title: string;
  overview?: any;
}

export interface IQuizScoreData {
  quizData: any;
}

export interface ICourseSummaryLegendData extends Omit<CompletionGraphStats, 'date'> {
  start_users: number;
  completed_users: number;
  completed_percentages: number;
  start_percentages: number;
}
