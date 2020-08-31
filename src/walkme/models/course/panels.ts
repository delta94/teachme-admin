import { AllCoursesOverviewResponse } from '../overview';

/**
 * Response object for main overview top 3 panels
 */

export type CourseOverviewData = AllCoursesOverviewResponse & {
  /** Average score for the quiz of this score */
  avg_quiz_score: number;
  /** Passmark score for the quiz of this score */
  passmark?: number;
  /** true if the course includes quiz */
  hasQuiz?: boolean;
};
