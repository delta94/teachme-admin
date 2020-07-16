import {
  BuildCourseTask,
  WalkMeDataCourseTaskSettings,
  WalkMeDataCourseNewItem,
} from '@walkme/types';
import { createLink } from '../../../collection';

export function toDataModel(item: BuildCourseTask, index: number): WalkMeDataCourseNewItem {
  return createLink(
    item,
    index,
    (_): WalkMeDataCourseTaskSettings => ({
      cmplType: item.properties.completionType,
    }),
  );
}
