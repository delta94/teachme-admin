import {
  BuildQuiz,
  WalkMeDataQuiz,
  QUIZ_ITEM_TYPES,
  QUIZ_TEMPLATE_IDS,
  QUIZ_COMPONENTS_IDS,
  DISPLAYER_ID,
  QuizScreen,
  BuildQuizProperties,
  BuildQuizQuestion,
  WalkMeDataQuizQuestion,
  NewQuestionData,
} from '@walkme/types';
import * as screen from './screen';
import { BuildQuizScreen } from './screen';
import { QuizProperties } from './settings';
import { QuizQuestion } from './question';

import * as question from './question';
import * as settings from './settings';
import defaults from '../../../defaults';
import { Container } from '../../../itemsContainer';

export function newDataModel(): WalkMeDataQuiz {
  return {
    IsEnabled: defaults.QUIZ_IS_ENABLED,
    Passmark: defaults.QUIZ_PASSMARK,
    Questions: [question.newDataModel(0, {})],
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

export class Quiz implements BuildQuiz {
  public welcomeScreen: BuildQuizScreen;
  public failScreen: BuildQuizScreen;
  public successScreen: BuildQuizScreen;
  public id: number;
  public properties: BuildQuizProperties;
  public questions: Container<QuizQuestion, NewQuestionData, WalkMeDataQuizQuestion>;
  constructor(private quiz: WalkMeDataQuiz) {
    this.welcomeScreen = new BuildQuizScreen(quiz.WelcomePage);
    this.failScreen = new BuildQuizScreen(quiz.FailSummeryPage);
    this.successScreen = new BuildQuizScreen(quiz.SuccessSummeryPage);
    this.id = quiz.Id!;
    this.properties = new QuizProperties(quiz.Settings, quiz.Passmark);
    this.questions = question.getQuizQuestions(quiz.Questions);
  }

  toDataModel = () => toDataModel(this, this.quiz);

  addQuestion() {}
}

// export function toUIModel(quiz: WalkMeDataQuiz): BuildQuiz {
//   return {
//     welcomeScreen: screen.toUIModel(quiz.WelcomePage),
//     failScreen: screen.toUIModel(quiz.FailSummeryPage),
//     successScreen: screen.toUIModel(quiz.SuccessSummeryPage),
//     id: quiz.Id!,
//     properties: settings.toUIModel(quiz.Settings, quiz.Passmark),
//     questions: quiz.Questions.map(question.toUIModel),
//   };
// }

export function toDataModel(quiz: BuildQuiz, dataQuiz: WalkMeDataQuiz): WalkMeDataQuiz {
  return {
    ...dataQuiz,
    FailSummeryPage: screen.toDataModel(quiz.failScreen, dataQuiz.FailSummeryPage),
    SuccessSummeryPage: screen.toDataModel(quiz.successScreen, dataQuiz.SuccessSummeryPage),
    WelcomePage: screen.toDataModel(quiz.welcomeScreen, dataQuiz.WelcomePage),
    Settings: settings.toDataModel(quiz.properties, dataQuiz.Settings),
    Passmark: quiz.properties.passmark,
    Questions: (quiz.questions as Container<
      QuizQuestion,
      NewQuestionData,
      WalkMeDataQuizQuestion
    >).toDataModel(),
  };
}
