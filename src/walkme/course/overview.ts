import * as wm from '@walkme/types';
import { getCourseSegments } from '../segments';
import { BuildCourse, WalkMeDataCourse, TypeName, WalkMeDataLesson } from '@walkme/types';
import { getData } from '../data';
import { convertToStringBoolean } from '../utils';
import { createLink } from '../collection';
export interface UICourse {
  id: number;
  title: string;
  publishStatus: PublishStatus;
  segments: Array<string>;
}

export enum PublishStatus {
  Published,
  Draft,
  Archived,
  Modified,
  Deleted,
}

export async function mapCourse(
  wmCourse: wm.WalkMeDataCourse,
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

// export async function mapToDataCourse(
//   course: BuildCourse,
// ): Promise<{ course: WalkMeDataCourse; lessons: Array<WalkMeDataLesson> }> {
//   const dataCourse = (await getData(TypeName.Course, 0, [course.id]))[0] as WalkMeDataCourse;
//   dataCourse.Name = course.title;
//   dataCourse.Settings = {
//     onlyPreviousDone: convertToStringBoolean(course.properties.enableIfPreviousDone),
//     enforceOrder: convertToStringBoolean(course.properties.enforceOrder),
//   };
//   dataCourse.LinkedDeployables = course.items.map((item) => createLink(course, item));
//   // dataCourse.Quiz;
//   return { course: dataCourse, lessons: [] };
// }
