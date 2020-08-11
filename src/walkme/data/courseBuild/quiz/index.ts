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
import defaults from '../defaults';
import { Container } from '../itemsContainer';

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
export type BuildQuizQuestions = Container<QuizQuestion, NewQuestionData, WalkMeDataQuizQuestion>;

export class Quiz implements BuildQuiz {
  public welcomeScreen: BuildQuizScreen;
  public failScreen: BuildQuizScreen;
  public successScreen: BuildQuizScreen;
  public id: number;
  public properties: BuildQuizProperties;
  public questions: BuildQuizQuestions;
  constructor(private _quiz: WalkMeDataQuiz) {
    this.welcomeScreen = new BuildQuizScreen(_quiz.WelcomePage);
    this.failScreen = new BuildQuizScreen(_quiz.FailSummeryPage);
    this.successScreen = new BuildQuizScreen(_quiz.SuccessSummeryPage);
    this.id = _quiz.Id!;
    this.properties = new QuizProperties(_quiz.Settings, _quiz.Passmark, _quiz.IsEnabled);
    this.questions = question.getQuizQuestions(_quiz.Questions);
  }

  toDataModel = () => toDataModel(this, this._quiz);

  isValid(): boolean {
    return (
      this.welcomeScreen.isValid() &&
      this.failScreen.isValid() &&
      this.successScreen.isValid() &&
      this.questions.toArray().every((q) => q.isValid())
    );
  }

  /**
   * This function's purpose is to understand if a quiz created in the old editor is in its default state.
   * A good heuristic for that is that the first question has the default text, since there's no chance it's used as a real question :)
   */
  public isDefault(): boolean {
    return (
      !this.properties.isEnabled && this.questions.getItem(0).title == defaults.FIRST_QUESTION_TEXT
    );
  }
}

export function toDataModel(quiz: BuildQuiz, dataQuiz: WalkMeDataQuiz): WalkMeDataQuiz {
  return {
    Id: quiz.id,
    ...dataQuiz,
    FailSummeryPage: screen.toDataModel(quiz.failScreen, dataQuiz.FailSummeryPage),
    SuccessSummeryPage: screen.toDataModel(quiz.successScreen, dataQuiz.SuccessSummeryPage),
    WelcomePage: screen.toDataModel(quiz.welcomeScreen, dataQuiz.WelcomePage),
    Settings: settings.toDataModel(quiz.properties, dataQuiz.Settings),
    Passmark: quiz.properties.passmark,
    Questions: (quiz.questions as BuildQuizQuestions).toDataModel(),
    IsEnabled: quiz.properties.isEnabled,
  };
}

export function getDefaultQuiz(ids: {
  quiz: number;
  success?: number;
  fail?: number;
  welcome?: number;
}): Quiz {
  const quiz = new Quiz(newDataModel());
  quiz.id = ids.quiz;
  quiz.welcomeScreen.id = ids.welcome;
  quiz.failScreen.id = ids.fail;
  quiz.successScreen.id = ids.success;
  return quiz;
}
