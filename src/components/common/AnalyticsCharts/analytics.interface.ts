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

export interface ICourseSummaryLegendData {
  startUsers: number;
  completedUsers: number;
  completedPercentages: number;
  startedPercentages: number;
}
