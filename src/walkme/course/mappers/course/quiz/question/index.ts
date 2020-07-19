import {
  WalkMeDataQuizQuestion,
  BuildQuizQuestion,
  QuizAnswer,
  QUIZ_ITEM_TYPES,
  QuizProperties,
  BuildQuizQuestionSettings,
  QuestionType,
  TypeContainer,
  WalkMeDataQuizAnswer,
  NewQuestionData,
} from '@walkme/types';
import * as settings from './settings';
import * as answers from './answers';
import defaults from '../../../../defaults';
import { QuizQuestionProperties } from './settings';
import { BuildQuizAnswer } from './answers';
import { timingSafeEqual } from 'crypto';
import { Container } from '../../../../itemsContainer';

export const getQuizQuestions = (questionsData: Array<WalkMeDataQuizQuestion>) =>
  new Container<QuizQuestion, NewQuestionData, WalkMeDataQuizQuestion>(
    questionsData,
    (data) => new QuizQuestion(data),
    newDataModel,
  );

export function newDataModel(index: number, _: NewQuestionData): WalkMeDataQuizQuestion {
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

  constructor(private question: WalkMeDataQuizQuestion) {
    this.id = question.Id;
    this.answers = answers.getQuizAnswers(question.Answers);
    this.description = question.Description;
    this.title = question.Question;
    this.type = question.QuestionType;
    this.explanation = question.Explanation;
    this.properties = new QuizQuestionProperties(question.Settings);
  }

  public toDataModel(index: number) {
    return {
      ...this.question,
      Answers: this.answers.toDataModel(),
      Description: this.description,
      Question: this.title,
      QuestionType: this.type,
      Explanation: this.explanation,
      Settings: this.properties?.getDataModel(),
      OrderIndex: index,
    };
  }

  public addNewAnswer() {
    this.answers.addNewItem({});
  }
}

// export function toUIModel(question: WalkMeDataQuizQuestion): BuildQuizQuestion {
//   return {
//     id: question.Id,
//     answers: answers.toUIModel(question.Answers),
//     description: question.Description,
//     title: question.Question,
//     type: question.QuestionType,
//     explanation: question.Explanation,
//     properties: settings.toUIModel(question.Settings),
//   };
// }

// export function toDataModel(
//   questions: Array<BuildQuizQuestion>,
//   dataQuestions: Array<WalkMeDataQuizQuestion>,
// ): Array<WalkMeDataQuizQuestion> {
//   const mappedQuestions: Array<WalkMeDataQuizQuestion> = [];
//   for (let i = 0; i < questions.length; i++) {
//     const question = questions[i];
//     const dataQuestion =
//       question.id > 0 ? dataQuestions.find((q) => q.Id == question.id) : newDataModel(i);
//     if (!dataQuestion) throw new Error("Can't map non-existing question");
//     mappedQuestions.push({
//       ...dataQuestion,
//       Answers: answers.toDataModel(question.answers, dataQuestion.Answers),
//       Description: question.description,
//       Question: question.title,
//       QuestionType: question.type,
//       Explanation: question.explanation,
//       Settings: settings.toDataModel(question.properties),
//       OrderIndex: i,
//     });
//   }
//   return mappedQuestions;
// }
