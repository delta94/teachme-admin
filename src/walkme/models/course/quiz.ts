import { QuestionType } from '@walkme/types';

/**
 * Quiz outline for analytics
 */
export type QuizOutlineUI = {
  /** Quiz id */
  id: number;
  /** Questions data */
  questions: Array<QuizOutlineUIQuestion>;
};

/** Quiz question data */
export type QuizOutlineUIQuestion = {
  /** Question id */
  id: number;
  /** Question text */
  title: string;
  /** Question text */
  type: QuestionType;
  /** Answers data */
  answers: Array<QuizOutlineUIAnswer>;
  /** Number of responses received for this question */
  total_responses: number;
};

/** Quiz answer data */
export type QuizOutlineUIAnswer = {
  /** Answer id */
  id: number;
  /** Answer text */
  title: string;
  /** Indication if answer is correct */
  isCorrect: boolean;
  /** Number of users who selected this answer */
  countAnswers: number;
};
