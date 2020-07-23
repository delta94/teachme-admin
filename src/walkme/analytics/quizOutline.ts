import * as endpoint from './endpoint';
import { TypeId, TypeName } from '@walkme/types';
import { types } from 'util';

export type QuizOutlineAnswerData = {
  id: number;
  count_answers: number;
};

export type QuizOutlineQuestionData = {
  id: number;
  answers: Array<QuizOutlineAnswerData>;
};

export type QuizOutlineData = {
  id: number;
  questions: Array<QuizOutlineQuestionData>;
};

/**
 *
 * @param environment walkme environment id
 * @param from date, format (YYYY-MM-DD)
 * @param to date, format (YYYY-MM-DD)
 */
export function getQuizData(
  course_id: number,
  environment: number,
  from: string,
  to: string,
): Promise<QuizOutlineData> {
  const query = new URLSearchParams();
  query.append('environment', environment.toString());
  query.append('from', from);
  query.append('to', to);
  return endpoint.get(`course/quiz/${course_id}?${query.toString()}`);
}
