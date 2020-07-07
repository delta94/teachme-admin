// TODO: create a properly interface instead of using any
export interface IAnalyticsCharts {
  data: any;
  courseTimeCompletionData: any;
  quizCompletionRateData: any;
}

// TODO: create a properly interface instead of using any
export interface ICourseStatusChart {
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
