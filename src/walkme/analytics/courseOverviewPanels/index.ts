import { AllCoursesOverviewResponse } from '../../models';

export type CourseOverviewResponse = AllCoursesOverviewResponse & {
  /** Averege score for this quiz */
  avg_quiz_score: number;
};
export * from './multiple';
export * from './single';
