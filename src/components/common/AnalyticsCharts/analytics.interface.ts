// TODO: create a properly interface instead of using any
export interface IAnalyticsCharts {
  data: any;
}

// TODO: create a properly interface instead of using any
export interface ICourseSummaryChart {
  summaryData: any;
}

// TODO: create a properly interface instead of using any
export interface ICoursesTimeCompletionChart {
  completionData: any;
}

// TODO: create a properly interface instead of using any
export interface IQuizCompletionRateChart {
  quizCompletionData: any;
}

export interface ICourseByDay {
  day: string | number;
  'Users Started'?: number;
  'Users Completed'?: number;
}
