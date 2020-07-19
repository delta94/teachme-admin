import { WalkMeDataQuizQuestion, BuildQuizQuestion } from '@walkme/types';
import * as settings from './settings';
import * as answers from './answers';
import { getNewQuestion } from '../../../../new';
import defaults from '../../../../defaults';

export function toUIModel(question: WalkMeDataQuizQuestion): BuildQuizQuestion {
  return {
    id: question.Id,
    answers: answers.toUIModel(question.Answers),
    description: question.Description,
    title: question.Question,
    type: question.QuestionType,
    explanation: question.Explanation,
    properties: settings.toUIModel(question.Settings),
  };
}

export function toDataModel(
  questions: Array<BuildQuizQuestion>,
  dataQuestions: Array<WalkMeDataQuizQuestion>,
): Array<WalkMeDataQuizQuestion> {
  const mappedQuestions: Array<WalkMeDataQuizQuestion> = [];
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const dataQuestion =
      question.id > 0 ? dataQuestions.find((q) => q.Id == question.id) : getNewQuestion(i);
    if (!dataQuestion) throw new Error("Can't map non-existing question");
    mappedQuestions.push({
      ...dataQuestion,
      Answers: answers.toDataModel(question.answers, dataQuestion.Answers),
      Description: question.description,
      Question: question.title,
      QuestionType: question.type,
      Explanation: question.explanation,
      Settings: settings.toDataModel(question.properties),
      OrderIndex: i,
    });
  }
  return mappedQuestions;
}

export function newDataModel(index: number): WalkMeDataQuizQuestion {
  return {
    Id: -index - 1,
    Question: defaults.QUESTION_TEXT,
    Description: defaults.QUESTION_DESCRIPTION,
    Answers: [
      answers.newDataModel(defaults.CORRECT_ANSWER_TEXT, true, 0),
      answers.newDataModel(defaults.INCORRECT_ANSWER_TEXT, false, 1),
    ],
    QuestionType: defaults.QUESTION_TYPE,
    OrderIndex: index,
  };
}
