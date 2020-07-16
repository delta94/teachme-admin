import { BuildQuiz, WalkMeDataQuiz } from '@walkme/types';
import * as screen from './screen';
import * as question from './question';
import * as settings from './settings';

export function toUIModel(quiz: WalkMeDataQuiz): BuildQuiz {
  return {
    welcomeScreen: screen.toUIModel(quiz.WelcomePage),
    failScreen: screen.toUIModel(quiz.FailSummeryPage),
    successScreen: screen.toUIModel(quiz.SuccessSummeryPage),
    id: quiz.Id,
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
