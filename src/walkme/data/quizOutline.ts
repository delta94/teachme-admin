import { TypeId, TypeName, QuestionType, BuildQuizQuestion, BuildQuiz } from '@walkme/types';
import { types } from 'util';
import {
  getQuizData,
  QuizOutlineData,
  QuizOutlineAnswerData,
  QuizOutlineQuestionData,
} from '../analytics/quizOutline';
import { getCourse } from './courseBuild';
import { Quiz, BuildQuizQuestions } from './courseBuild/quiz';
import { QuizQuestion } from './courseBuild/quiz/question';
import { BuildQuizAnswer } from './courseBuild/quiz/question/answers';

export enum APITypes {
  Content = 'resource',
  SWT = 'bizFlow',
}

export type QuizOutlineUIAnswer = {
  id: number;
  title: string;
  isCorrect: boolean;
  countAnswers: number;
};

export type QuizOutlineUIQuestion = {
  id: number;
  title: string;
  type: QuestionType;
  answers: Array<QuizOutlineUIAnswer>;
};

export type QuizOutlineUI = {
  id: number;
  questions: Array<QuizOutlineUIQuestion>;
};

/**
 *
 * @param environment walkme environment id
 * @param from date, format (YYYY-MM-DD)
 * @param to date, format (YYYY-MM-DD)
 */
export async function getUIQuiz(
  course_id: number,
  environment: number,
  from: string,
  to: string,
): Promise<QuizOutlineUI | undefined> {
  const [quizData, course] = await Promise.all([
    getQuizData(course_id, environment, from, to),
    getCourse(course_id, environment),
  ]);
  if (!course.quiz) return;

  return mapQuiz(course.quiz, quizData);
}

function mapQuiz(metadata: Quiz, data: QuizOutlineData): QuizOutlineUI {
  return {
    id: metadata.id,
    questions: metadata.questions.toArray().map((question) => {
      const questionData = data?.questions?.find((questionData) => questionData.id == question.id);
      return mapQuestion(question, questionData);
    }),
  };
}

function mapQuestion(
  metadata: QuizQuestion,
  data?: QuizOutlineQuestionData,
): QuizOutlineUIQuestion {
  return {
    id: metadata.id,
    title: metadata.title,
    type: metadata.type,
    answers: metadata.answers.toArray().map((answer) => {
      const answerData = data?.answers?.find((answerData) => answerData.id == answer.id);
      return mapAnswer(answer, answerData);
    }),
  };
}

function mapAnswer(metadata: BuildQuizAnswer, data?: QuizOutlineAnswerData): QuizOutlineUIAnswer {
  return {
    countAnswers: data?.count_answers ?? 0,
    id: metadata.id,
    isCorrect: metadata.isCorrect,
    title: metadata.text,
  };
}
