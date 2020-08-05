import * as wm from '@walkme/types';
import { getCourseSegments } from './services/segments';
import { TypeName, WalkMeDataCourse } from '@walkme/types';
import { CourseMetadata, PublishStatus } from '../models';
import { getData } from './services/wmData';

export async function getCourseMetadata(
  courseOrId: WalkMeDataCourse | number,
  environmentId: number,
): Promise<CourseMetadata> {
  const course = await getCourse(courseOrId, environmentId);
  return {
    id: course.Id,
    title: course.Name,
    publishStatus: getPublishStatus(course, environmentId),
    segments: await getCourseSegments(course.Id, environmentId),
  };
}

async function getCourse(
  courseOrId: WalkMeDataCourse | number,
  environmentId: number,
): Promise<WalkMeDataCourse> {
  if (typeof courseOrId === 'number') {
    const [course] = await getData(TypeName.Course, environmentId, [courseOrId]);
    return course as WalkMeDataCourse;
  }
  return courseOrId;
}

export function getPublishStatus(course: WalkMeDataCourse, environmentId: number): PublishStatus {
  const publishData = course.PublishDataByEnvs[environmentId];
  if (!publishData)
    throw new Error(
      `Could not find publish data for item [${course.Name}] environment id [${environmentId}]`,
    );
  return mapPublishStatus(publishData);
}

function mapPublishStatus(status: wm.PublishData): PublishStatus {
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
