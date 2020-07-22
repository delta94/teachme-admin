import { WalkMeDataTag, WalkMeLink, TypeName, TypeId } from '@walkme/types';
import { getData } from './wmData';

export async function getCourseSegments(
  course_id: number,
  environment_id: number,
): Promise<Array<string>> {
  const segments = (await getData(TypeName.Tag, environment_id)) as Array<WalkMeDataTag>;
  return segments
    .filter((segment) => isInSegment(segment, TypeName.Course, course_id))
    .map((segment) => segment.Name);
}

function isInSegment(segment: WalkMeDataTag, type: TypeName, id: number): boolean {
  return segment.LinkedDeployables.filter(getTypeFilter(type))
    .map((item) => item.DeployableID)
    .includes(id);
}

const getTypeFilter = (type: TypeName) =>
  //@ts-ignore
  (item: WalkMeNewLink) => item.DeployableType == parseInt(TypeId[type]);
