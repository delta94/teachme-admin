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

export interface ICourseByDay {
  day: string | number;
  'Users Started'?: number;
  'Users Completed'?: number;
}
