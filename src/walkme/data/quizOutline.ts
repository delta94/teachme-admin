import {
  getQuizData,
  QuizOutlineData,
  QuizOutlineAnswerData,
  QuizOutlineQuestionData,
} from '../analytics/quizOutline';
import { getCourse } from './courseBuild';
import { Quiz } from './courseBuild/quiz';
import { QuizQuestion } from './courseBuild/quiz/question';
import { BuildQuizAnswer } from './courseBuild/quiz/question/answers';
import { QuizOutlineUI, QuizOutlineUIQuestion, QuizOutlineUIAnswer } from '../models/course/quiz';

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
