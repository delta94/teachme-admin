import { WalkMeDataTag, WalkMeLink } from '@walkme/types';
import walkme, { TYPE_NAMES, TYPE_IDS } from '@walkme/editor-sdk';
import { getData } from './data';

export async function getCourseSegments(
  course_id: number,
  environment_id: number
): Promise<Array<string>> {
  const segments = (await getData(TYPE_NAMES.TAG, environment_id)) as Array<WalkMeDataTag>;
  return segments
    .filter(segment => isInSegment(segment, walkme.data.TYPE_NAMES.COURSE, course_id))
    .map(segment => segment.Name);
}

function isInSegment(segment: WalkMeDataTag, type: TYPE_NAMES, id: number): boolean {
  return segment.LinkedDeployables.filter(getTypeFilter(type))
    .map(item => item.DeployableID)
    .includes(id);
}

const getTypeFilter = (type: TYPE_NAMES) => (item: WalkMeLink) =>
  item.DeployableType == TYPE_IDS[type];
