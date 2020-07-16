import { WalkMeDataQuizSettings, BuildQuizProperties } from '@walkme/types';
import { convertToNumberBoolean, isTrue } from '../../../../utils';

export function toUIModel(settings: WalkMeDataQuizSettings, passmark: number): BuildQuizProperties {
  return {
    forceCourseCompletion: isTrue(settings.isLimited),
    randQuestions: isTrue(settings.randQuestions),
    randAnswers: isTrue(settings.randAnswers),
    showSummary: isTrue(settings.isQuizResults),
    passmark,
  };
}

export function toDataModel(
  properties: BuildQuizProperties,
  dataSettings: WalkMeDataQuizSettings,
): WalkMeDataQuizSettings {
  return {
    ...dataSettings,
    isLimited: convertToNumberBoolean(properties.forceCourseCompletion),
    isQuizResults: convertToNumberBoolean(properties.showSummary),
    randAnswers: convertToNumberBoolean(properties.randAnswers),
    randQuestions: convertToNumberBoolean(properties.randQuestions),
  };
}
