import * as wm from '@walkme/types';
import walkme from '@walkme/editor-sdk';
import { getCourseSegments } from './services/segments';
import { CourseListItem, getCourseListData } from '../analytics';
import { TypeName, WalkMeDataCourse } from '@walkme/types';
import { join } from '../utils';
import { notEmpty } from '../utils';
import { PublishStatus } from '../models/course';
import { getPublishStatus } from './courseMetadata';
import * as wmData from './services/wmData';

export { PublishStatus };
export interface UICourse {
  id: number;
  title: string;
  publishStatus: PublishStatus;
  segments: Array<string>;
  users_started: number | null;
  users_completed: number | null;
  avg_quiz_score: number | null;
  avg_quiz_attempts: number | null;
  quiz_passed: boolean;
}

export async function getCourseList(
  environmentId: number,
  from: string,
  to: string,
): Promise<Array<UICourse>> {
  const [coursesMetadata, coursesData] = await Promise.all([
    wmData.getData(TypeName.Course, environmentId),
    getCourseListData(environmentId, from, to),
  ]);
  const mergedData = join(coursesMetadata as WalkMeDataCourse[], coursesData, 'Id', 'course_id');
  const uiCourses = await Promise.all(
    mergedData.map((course) => {
      try {
        return mapCourse(course, environmentId);
      } catch (err) {
        walkme.error(err);
        return null;
      }
    }),
  );
  return uiCourses.filter(notEmpty);
}

async function mapCourse(
  wmCourse: wm.WalkMeDataCourse & CourseListItem,
  environmentId: number,
): Promise<UICourse> {
  //todo: take care of no quiz
  return {
    id: wmCourse.Id,
    title: wmCourse.Name,
    publishStatus: getPublishStatus(wmCourse, environmentId),
    segments: await getCourseSegments(wmCourse.Id, environmentId),
    avg_quiz_attempts: wmCourse.avg_quiz_attempts,
    avg_quiz_score: wmCourse.avg_quiz_score,
    users_completed: wmCourse.users_completed,
    users_started: wmCourse.users_started,
    quiz_passed: wmCourse.avg_quiz_score >= wmCourse.Quiz.Passmark,
  };
}
