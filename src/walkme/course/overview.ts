import * as wm from '@walkme/types';
import { getCourseSegments } from '../segments';
import { CourseListItem } from '../analytics';
export interface UICourse {
  id: number;
  title: string;
  publishStatus: PublishStatus;
  segments: Array<string>;
  users_started: number | null;
  users_completed: number | null;
  avg_quiz_score: number | null;
  avg_quiz_attempts: number | null;
}

export enum PublishStatus {
  Published,
  Draft,
  Archived,
  Modified,
  Deleted,
}

export async function mapCourse(
  wmCourse: wm.WalkMeDataCourse & CourseListItem,
  environmentId: number,
): Promise<UICourse> {
  const publishData = wmCourse.PublishDataByEnvs[environmentId];
  if (!publishData)
    throw new Error(
      `Could not find publish data for item [${wmCourse.Name}] environment id [${environmentId}]`,
    );

  return {
    id: wmCourse.Id,
    title: wmCourse.Name,
    publishStatus: getPublishStatus(publishData),
    segments: await getCourseSegments(wmCourse.Id, environmentId),
    avg_quiz_attempts: wmCourse.avg_quiz_attempts,
    avg_quiz_score: wmCourse.avg_quiz_score,
    users_completed: wmCourse.users_completed,
    users_started: wmCourse.users_started,
  };
}

function getPublishStatus(status: wm.PublishData): PublishStatus {
  switch (status.PublishStatus) {
    case wm.PublishStatus.Archived:
      return PublishStatus.Archived;
    case wm.PublishStatus.Deleted:
      return PublishStatus.Deleted;
    case wm.PublishStatus.Draft:
      return PublishStatus.Draft;
    case wm.PublishStatus.Published:
      return status.IsModified ? PublishStatus.Modified : PublishStatus.Published;
    case wm.PublishStatus.ReadyToDelete:
      return PublishStatus.Deleted;
  }
}
