export interface IAnalyticsCharts {
  data: any;
}

export interface ICourseStatusChart {
  summaryData: any;
}

export interface ICoursesTimeCompletionChart {
  completionData: any;
}

export interface IQuizCompletionRateChart {
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
