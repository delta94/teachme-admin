import * as data from '../data';
import { getUIQuiz } from '../data/quizOutline';
import { CourseOverviewData } from '../models';
import { CourseOutlineUIModel } from '../models/course/outline';
import { QuizOutlineUI } from '../models/course/quiz';

/**
 * Returns data for the course outline tab
 * @param courseId requested course id
 * @param environmentId requested environment id
 * @param from start date in format YYYY-MM-DD
 * @param to end date in format YYYY-MM-DD
 */
export async function getCourseOutline(
  courseId: number,
  environmentId: number,
  from: string,
  to: string,
): Promise<CourseOutlineUIModel> {
  return data.getCourseOutline(courseId, environmentId, from, to);
}

/**
 * Returns data for the quiz outline tab
 * @param courseId requested course id
 * @param environmentId requested environment id
 * @param from start date in format YYYY-MM-DD
 * @param to end date in format YYYY-MM-DD
 */
export async function getQuizData(
  course_id: number,
  environment: number,
  from: string,
  to: string,
): Promise<QuizOutlineUI | undefined> {
  return getUIQuiz(course_id, environment, from, to);
}

/**
 * Returns data for the top 3 panels in the course screen
 * @param courseId requested course id
 * @param environmentId requested environment id
 * @param from start date in format YYYY-MM-DD
 * @param to end date in format YYYY-MM-DD
 */
export async function getCourseOverview(
  course_id: number,
  environment: number,
  from: string,
  to: string,
): Promise<CourseOverviewData> {
  return data.getCourseOverview(course_id, environment, from, to);
}
