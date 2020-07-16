import { WalkMeDataQuizQuestion, BuildQuizQuestion } from '@walkme/types';
import * as settings from './settings';
import * as answers from './answers';

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
    const dataQuestion = dataQuestions.find((q) => q.Id == question.id);
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
