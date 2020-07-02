import { WalkMeDataTag, WalkMeLink } from '@walkme/types';
import walkme, { TYPE_NAMES, TYPE_IDS } from '@walkme/editor-sdk';

let segments: Array<WalkMeDataTag> = [];
let initializing: Promise<any>;

async function init(environment_id: number) {
  if (!initializing) {
    initializing = walkme.data.getContent(walkme.data.TYPE_NAMES.TAG, environment_id);
  }
  segments = await initializing;
}
export async function getCourseSegments(
  course_id: number,
  environment_id: number
): Promise<Array<string>> {
  await init(environment_id);
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
