import {
  BuildQuiz,
  WalkMeDataQuiz,
  QUIZ_ITEM_TYPES,
  QUIZ_TEMPLATE_IDS,
  QUIZ_COMPONENTS_IDS,
} from '@walkme/types';
import * as screen from './screen';
import * as question from './question';
import * as settings from './settings';
import defaults from '../../../defaults';

export function toUIModel(quiz: WalkMeDataQuiz): BuildQuiz {
  return {
    welcomeScreen: screen.toUIModel(quiz.WelcomePage),
    failScreen: screen.toUIModel(quiz.FailSummeryPage),
    successScreen: screen.toUIModel(quiz.SuccessSummeryPage),
    id: quiz.Id!,
    properties: settings.toUIModel(quiz.Settings, quiz.Passmark),
    questions: quiz.Questions.map(question.toUIModel),
  };
}

export function toDataModel(quiz: BuildQuiz, dataQuiz: WalkMeDataQuiz): WalkMeDataQuiz {
  return {
    ...dataQuiz,
    FailSummeryPage: screen.toDataModel(quiz.failScreen, dataQuiz.FailSummeryPage),
    SuccessSummeryPage: screen.toDataModel(quiz.successScreen, dataQuiz.SuccessSummeryPage),
    WelcomePage: screen.toDataModel(quiz.welcomeScreen, dataQuiz.WelcomePage),
    Settings: settings.toDataModel(quiz.properties, dataQuiz.Settings),
    Passmark: quiz.properties.passmark,
    Questions: question.toDataModel(quiz.questions, dataQuiz.Questions),
  };
}

export function newDataModel(): WalkMeDataQuiz {
  return {
    IsEnabled: defaults.QUIZ_IS_ENABLED,
    Passmark: defaults.QUIZ_PASSMARK,
    Questions: [],
    FailSummeryPage: screen.newDataModel(QUIZ_ITEM_TYPES.FailSummeryPage),
    SuccessSummeryPage: screen.newDataModel(QUIZ_ITEM_TYPES.SuccessSummeryPage),
    WelcomePage: screen.newDataModel(QUIZ_ITEM_TYPES.WelcomePage),
    Settings: settings.newDataModel(),
    UITemplateId: QUIZ_TEMPLATE_IDS.Quiz,
    DisplayerId: DISPLAYER_ID.POPUP_DISPLAYER_ID,
    UiComponentId: QUIZ_COMPONENTS_IDS.Quiz,
    UiComponentVersion: 1,
    UITemplateVersion: 1,
  };
}
