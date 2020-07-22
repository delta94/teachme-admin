import { WalkMeDataQuizQuestionSettings, BuildQuizQuestionSettings } from '@walkme/types';
import { isTrue, convertToNumberBoolean } from '../../../../utils';

export function toUIModel(
  settings?: WalkMeDataQuizQuestionSettings,
): BuildQuizQuestionSettings | undefined {
  if (!settings) return;
  return {
    hasExplanation: isTrue(settings.hasExplanation),
  };
}

export function toDataModel(
  settings?: BuildQuizQuestionSettings,
): WalkMeDataQuizQuestionSettings | undefined {
  if (!settings) return;
  return {
    hasExplanation: convertToNumberBoolean(!!settings.hasExplanation),
  };
}

export class QuizQuestionProperties implements BuildQuizQuestionSettings {
  public hasExplanation: boolean;
  constructor(settings?: WalkMeDataQuizQuestionSettings) {
    this.hasExplanation = isTrue(settings?.hasExplanation);
  }

  getDataModel = () => toDataModel(this);
}
