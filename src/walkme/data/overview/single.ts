import * as analytics from '../../analytics';
import { getCourseMetadata } from '../courseBuild';
import { CourseOverviewData } from '../../models';

export async function getCourseOverview(
  course_id: number,
  environment: number,
  from: string,
  to: string,
): Promise<CourseOverviewData> {
  const overviewData = await analytics.getSingleCourseOverview(course_id, environment, from, to);
  const course = await getCourseMetadata(course_id, environment);
  return {
    ...overviewData,
    passmark: course.quiz?.properties.passmark,
    hasQuiz: !!course.quiz,
  };
}
