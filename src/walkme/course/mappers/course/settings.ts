import { WalkMeDataCourseSettings, BuildCourseProperties } from '@walkme/types';
import {  isTrue, convertToNumberBoolean } from '../../../utils';

export function toUIModel(settings: WalkMeDataCourseSettings): BuildCourseProperties {
  return {
    enableIfPreviousDone: isTrue(settings.onlyPreviousDone),
    enforceOrder: isTrue(settings.enforceOrder),
  };
}

export function toDataModel(
  properties: BuildCourseProperties,
  dataSettings: WalkMeDataCourseSettings,
): WalkMeDataCourseSettings {
  return {
    enforceOrder: convertToNumberBoolean(properties.enforceOrder),
    onlyPreviousDone: convertToNumberBoolean(properties.enableIfPreviousDone),
  };
}
