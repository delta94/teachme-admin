import { WalkMeDataTag, WalkMeLink, TypeName, TypeId } from '@walkme/types';
import { getData, getDataSync } from './wmData';
import { getTypeId } from './item';
import { UISegment } from '../../models';

export async function getCourseSegments(
  course_id: number,
  environment_id: number,
): Promise<Array<string>> {
  const segments = (await getData(TypeName.Tag, environment_id)) as Array<WalkMeDataTag>;
  return segments
    .filter((segment) => isInSegment(segment, TypeName.Course, course_id))
    .map((segment) => segment.Name);
}

export function getCourseSegmentsSync(course_id: number): Array<UISegment> {
  const segments = getDataSync(TypeId.Tag) as Array<WalkMeDataTag>;
  return segments
    .filter((segment) => isInSegment(segment, TypeName.Course, course_id))
    .map((segment) => ({
      id: segment.Id,
      name: segment.Name,
    }));
}

function isInSegment(segment: WalkMeDataTag, type: TypeName, id: number): boolean {
  return segment.LinkedDeployables.filter(getTypeFilter(type))
    .map((item) => item.DeployableID)
    .includes(id);
}

const getTypeFilter = (type: TypeName) =>
  //@ts-ignore
  (item: WalkMeNewLink) => item.DeployableType == parseInt(getTypeId(type));

export async function getSegments(environment_id: number): Promise<Array<UISegment>> {
  const segments = (await getData(TypeName.Tag, environment_id)) as Array<WalkMeDataTag>;
  return segments.map<UISegment>((segment) => ({
    id: segment.Id,
    name: segment.Name,
  }));
}

export async function getLinkId(
  itemType: TypeId,
  itemId: number,
  tagId: number,
): Promise<number | null> {
  const [tag] = (await getData(TypeName.Tag, 0, [tagId])) as Array<WalkMeDataTag>;
  if (!tag) throw new Error(`Tag with id ${tagId} is not found on this account`);

  const link = tag.LinkedDeployables.find(
    (link) => link.DeployableID == itemId && link.DeployableType == itemType,
  );
  return (link as WalkMeLink)?.Id ?? null;
}
