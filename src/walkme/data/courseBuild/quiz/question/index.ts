import {
  WalkMeDataQuizQuestion,
  BuildQuizQuestion,
  QuestionType,
  WalkMeDataQuizAnswer,
  NewQuestionData,
} from '@walkme/types';
import * as answers from './answers';
import defaults from '../../defaults';
import { QuizQuestionProperties } from './settings';
import { BuildQuizAnswer } from './answers';
import { Container } from '../../itemsContainer';

export const getQuizQuestions = (questionsData: Array<WalkMeDataQuizQuestion>) =>
  new Container<QuizQuestion, NewQuestionData, WalkMeDataQuizQuestion>(
    questionsData,
    (data) => new QuizQuestion(data),
    newDataModel,
  );

export function newDataModel(index: number, data?: NewQuestionData): WalkMeDataQuizQuestion {
  return {
    Id: -index - 1,
    Question: defaults.QUESTION_TEXT,
    Description: defaults.QUESTION_DESCRIPTION,
    Answers: [
      answers.newDataModel(0, { text: defaults.CORRECT_ANSWER_TEXT, isCorrect: true }),
      answers.newDataModel(1, { text: defaults.INCORRECT_ANSWER_TEXT, isCorrect: false }),
    ],
    QuestionType: defaults.QUESTION_TYPE,
    OrderIndex: index,
  };
}

export class QuizQuestion implements BuildQuizQuestion {
  public id: number;
  public answers: Container<BuildQuizAnswer, NewQuestionData, WalkMeDataQuizAnswer>;
  public description: string;
  public title: string;
  public type: QuestionType;
  public explanation?: string;
  public properties?: QuizQuestionProperties;

  constructor(private _question: WalkMeDataQuizQuestion) {
    this.id = _question.Id;
    this.answers = answers.getQuizAnswers(_question.Answers);
    this.description = _question.Description;
    this.title = _question.Question;
    this.type = _question.QuestionType;
    this.explanation = _question.Explanation;
    this.properties = new QuizQuestionProperties(_question.Settings);
  }

  public toDataModel(index: number) {
    return {
      ...this._question,
      Answers: this.answers.toDataModel(),
      Description: this.description,
      Question: this.title,
      QuestionType: this.type,
      Explanation: this.explanation,
      Settings: this.properties?.getDataModel(),
      OrderIndex: index,
    };
  }
}
