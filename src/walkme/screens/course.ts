import * as data from '../data';
import { getUIQuiz } from '../data/quizOutline';
import { CourseOverviewData } from '../models';
import {
  CourseOutlineUIModel,
  CourseChildType,
  CourseOutlineUIModelLesson,
} from '../models/course/outline';
import { QuizOutlineUI } from '../models/course/quiz';
import { saveAsCsv } from '../utils';

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

/**
 * Downloads the course outline data as csv
 * @param environmentId the requested walkme environment
 * @param from start date in format YYYY-MM-DD
 * @param to end date in format YYYY-MM-DD
 * @returns a promise that is resolved once the file is downloaded
 */
export async function exportCourseOutline(
  courseId: number,
  environmentId: number,
  from: string,
  to: string,
): Promise<void> {
  const outline = await getCourseOutline(courseId, environmentId, from, to);
  const csvData = outline.flatMap((child) => {
    if (child.childType == CourseChildType.Task) return child;
    return (child as CourseOutlineUIModelLesson).items.map((task) => ({
      ...task,
      lesson_title: child.title,
      lesson_id: child.id,
    }));
  });
  return saveAsCsv(
    csvData,
    ['id', 'title', 'lesson_id', 'lesson_title', 'users_completed', 'drop_off', 'type'],
    `teachme-course-outline-data-${Date.now()}`,
  );
}
