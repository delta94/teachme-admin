import { WalkMeDataCourseSettings, BuildCourseProperties } from '@walkme/types';
import { isTrue, convertToNumberBoolean } from '../../../utils';

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

export class CourseProperties implements BuildCourseProperties {
  public enableIfPreviousDone: boolean;
  public enforceOrder: boolean;
  constructor(settings: WalkMeDataCourseSettings) {
    this.enableIfPreviousDone = isTrue(settings.onlyPreviousDone);
    this.enforceOrder = isTrue(settings.enforceOrder);
  }

  toDataModel(): WalkMeDataCourseSettings {
    return {
      enforceOrder: convertToNumberBoolean(this.enforceOrder),
      onlyPreviousDone: convertToNumberBoolean(this.enableIfPreviousDone),
    };
  }
}
