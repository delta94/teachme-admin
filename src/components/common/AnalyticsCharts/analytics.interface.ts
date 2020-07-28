import { CompletionGraphStats } from '../../../walkme/models';

export interface IAnalyticsCharts {
  data: any;
}

// TODO: create a properly interface instead of using any
export interface ICourseSummaryChart {
  summaryData: any;
}

export interface ICoursesTimeCompletionChart {
  className?: string;
  completionData: any;
}

export interface IQuizCompletionRateChart {
  className?: string;
  quizCompletionData: any;
}

export interface IQuizScoreData {
  quizScoreData: any;
}

export interface ICourseSummaryLegendData extends Omit<CompletionGraphStats, 'date'> {
  start_users: number;
  completed_users: number;
  completed_percentages: number;
  start_percentages: number;
}
