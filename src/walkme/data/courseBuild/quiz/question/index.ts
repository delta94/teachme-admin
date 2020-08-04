import {
  WalkMeDataQuizQuestion,
  BuildQuizQuestion,
  QuestionType,
  WalkMeDataQuizAnswer,
  NewQuestionData,
  QuizAnswer,
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

export type QuizQuestionAnswers = Container<BuildQuizAnswer, NewQuestionData, WalkMeDataQuizAnswer>;

export class QuizQuestion implements BuildQuizQuestion {
  public id: number;
  public answers: QuizQuestionAnswers;
  public description: string;
  public title: string;
  private _type: QuestionType;
  public explanation?: string;
  public properties?: QuizQuestionProperties;

  constructor(private _question: WalkMeDataQuizQuestion) {
    this.id = _question.Id;
    this.answers = answers.getQuizAnswers(_question.Answers);
    this.description = _question.Description;
    this.title = _question.Question;
    this._type = _question.QuestionType;
    this.explanation = _question.Explanation;
    this.properties = new QuizQuestionProperties(_question.Settings);
    this.answers.spy(this.setSingleSelect);
  }

  set type(val: QuestionType) {
    if (this._type == QuestionType.Multiple && val == QuestionType.Single) {
      const firstCorrect = this.answers.toArray().findIndex((ans) => ans.isCorrect == true);
      this.answers.toArray().forEach((ans, index) => {
        if (index === firstCorrect) return;
        ans.isCorrect = false;
      });
    }
    this._type = val;
  }

  get type(): QuestionType {
    return this._type;
  }

  private setSingleSelect = (
    changedAnswer: QuizAnswer,
    prop: string | number | symbol,
    val: any,
  ): void => {
    if (this._type == QuestionType.Multiple || prop !== 'isCorrect' || !val) return;

    this.answers.toArray().forEach((answer) => {
      if (answer == changedAnswer) return;
      answer.isCorrect = false;
    });
  };

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

  isValid(): boolean {
    return !!this.title && this.answers.toArray().every((a) => a.isValid());
  }
}
