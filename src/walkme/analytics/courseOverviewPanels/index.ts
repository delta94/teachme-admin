export type AllCoursesOverviewResponse = {
  total_completion: CompletionGraphStats;
  mark_completion: Array<CompletionGraphStats>;
  users_submitted: number;
  users_passed: number;
  completion_time: CompletionTimeStats;
  total_users_accessed: 0;
};

export type CourseOverviewResponse = AllCoursesOverviewResponse & {
  avg_quiz_score: number;
};

export type CompletionGraphStats = {
  /** format YYYY-MM-DD */
  from: string;
  to: string;
  users_started: number;
  users_completed: number;
};

export type CompletionTimeStats = {
  avg: number;
  buckets: Array<CompletionTimeBucketStats>;
};

export type CompletionTimeBucketStats = {
  from: number;
  to: number;
  percentage: number;
};

export * from './multiple';
export * from './single';
