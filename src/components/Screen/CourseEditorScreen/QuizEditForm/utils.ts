import { QuizScreenType } from './interface';

export const screenTitle = (type: QuizScreenType, title?: string): string => {
  switch (type) {
    case QuizScreenType.WelcomeScreen:
      return 'Quiz Welcome Page';
    case QuizScreenType.SuccessScreen:
      return 'Quiz Success Page';
    case QuizScreenType.FailScreen:
      return 'Quiz Fail Page';
    case QuizScreenType.QuestionScreen:
      return title ?? '';
    default:
      throw new Error(`Unknown quiz screen type ${type}`);
  }
};
