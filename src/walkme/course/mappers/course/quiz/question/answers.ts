import { WalkMeDataQuizAnswer, QuizAnswer } from '@walkme/types';

export function toUIModel(answersData: Array<WalkMeDataQuizAnswer>): Array<QuizAnswer> {
  return answersData.map((answersData) => ({
    id: answersData.Id,
    isCorrect: answersData.IsCorrect,
    text: answersData.Text,
  }));
}

export function toDataModel(
  answers: Array<QuizAnswer>,
  dataAnswers: Array<WalkMeDataQuizAnswer>,
): Array<WalkMeDataQuizAnswer> {
  return answers.map<WalkMeDataQuizAnswer>(
    (answer, index): WalkMeDataQuizAnswer => ({
      Id: answer.id,
      IsCorrect: answer.isCorrect,
      OrderIndex: index,
      Text: answer.text,
    }),
  );
}
