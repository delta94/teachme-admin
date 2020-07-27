/**
 * Response object for main overview top 3 panels
 */
export type AllCoursesOverviewResponse = {
  /** Completion data to display on the left side of the graph */
  total_completion: { start_users: number; completed_users: number };
  /**
   * Number of users with walkme access in the period
   * Used for the left hand side fo the graph
   */
  total_users_accessed: number;
  /** Completion data for each point in the graph */
  mark_completion: Array<CompletionGraphStats>;
  /** Completion timing data to display on the top right panel */
  completion_time: CompletionTimeStats;
  /**
   * Number of total users who submitted a quiz.
   * Used as baseline for quiz completion rate panel
   */
  users_submitted: number;
  /**
   * Number of total users who passed a quiz.
   * Used as enumerator for quiz completion rate panel
   */
  users_passed: number;
};

/**
 * Represents completions stats for a specific time period
 */
export type CompletionGraphStats = {
  /** range start data string in date format YYYY-MM-DD */
  from: string;
  /** range end data string in date format YYYY-MM-DD */
  to: string;
  /** number of users who started a course in this range */
  users_started: number;
  /** number of users who completed a course in this range */
  users_completed: number;
};

/**
 * Completion timing data to display on the top right panel
 */
export type CompletionTimeStats = {
  /** Global average completion time in hours */
  avg: number;
  /** Completion time breakdown */
  buckets: Array<CompletionTimeBucketStats>;
};

/**
 *  Completion time breakdown
 */
export type CompletionTimeBucketStats = {
  /** range upper bound in hours */
  from: number;
  /** range lower bound in hours */
  to: number;
  /** percentage of users in this range */
  percentage: number;
};
