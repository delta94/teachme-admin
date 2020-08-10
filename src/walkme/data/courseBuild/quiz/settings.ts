import { WalkMeDataQuizSettings, BuildQuizProperties, BooleanStringOption } from '@walkme/types';
import { convertToNumberBoolean, isTrue } from '../../../utils';

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

export function newDataModel(): WalkMeDataQuizSettings {
  return { overlay: {}, position: 8, isQuizResults: BooleanStringOption.TRUE };
}

export class QuizProperties implements BuildQuizProperties {
  public forceCourseCompletion: boolean;
  public randAnswers: boolean;
  public randQuestions: boolean;
  public showSummary: boolean;
  public passmark: number;
  public isEnabled: boolean;

  constructor(private _settings: WalkMeDataQuizSettings, passmark: number, isEnabled: boolean) {
    this.forceCourseCompletion = isTrue(_settings.isLimited);
    this.randQuestions = isTrue(_settings.randQuestions);
    this.randAnswers = isTrue(_settings.randAnswers);
    this.showSummary = isTrue(_settings.isQuizResults);
    this.passmark = passmark;
    this.isEnabled = isEnabled;
  }

  getDataModel = () => toDataModel(this, this._settings);
}
