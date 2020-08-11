import { WalkMeDataCourseSettings, BuildCourseProperties } from '@walkme/types';
import { isTrue, convertToNumberBoolean } from '../../utils';

export class CourseProperties implements BuildCourseProperties {
  public enableIfPreviousDone: boolean;
  public enforceOrder: boolean;
  public hasQuiz: boolean;
  constructor(settings: WalkMeDataCourseSettings, isQuizDefault: () => boolean) {
    this.enableIfPreviousDone = isTrue(settings.onlyPreviousDone);
    this.enforceOrder = isTrue(settings.enforceOrder);
    this.hasQuiz = (settings.hasQuiz === undefined && !isQuizDefault()) || isTrue(settings.hasQuiz);
  }

  toDataModel(): WalkMeDataCourseSettings {
    return {
      enforceOrder: convertToNumberBoolean(this.enforceOrder),
      onlyPreviousDone: convertToNumberBoolean(this.enableIfPreviousDone),
      hasQuiz: convertToNumberBoolean(this.hasQuiz),
    };
  }
}
