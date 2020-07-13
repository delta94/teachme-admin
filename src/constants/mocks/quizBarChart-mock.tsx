export interface IQuizData {
  readonly name: string;
  readonly questions: Array<IQuizQuestions>;
}

export interface IQuizQuestions {
  readonly title: string;
  readonly type: string;
  readonly totalValue: number;
  readonly answers: Array<IQuizAnswers>;
}

export interface IQuizAnswers {
  readonly title: string;
  readonly value: number;
  readonly isCorrect: boolean;
}

export const quizBarChartMock: IQuizData = {
  name: 'Zendesk Fundamentals',
  questions: [
    {
      title: 'What was the nature of creation?',
      type: 'Multiple selection',
      totalValue: 5105,
      answers: [
        {
          title: 'A bug in the checkout process',
          value: 2482,
          isCorrect: true,
        },
        {
          title: 'Flying Spaghetti monster',
          value: 1689,
          isCorrect: false,
        },
        {
          title: 'Dinosaur Rebellion',
          value: 513,
          isCorrect: true,
        },
        {
          title: 'Bruce All Mighty',
          value: 183,
          isCorrect: false,
        },
        {
          title: 'The Big Bang',
          value: 163,
          isCorrect: false,
        },
        {
          title: 'All Possible Answers',
          value: 75,
          isCorrect: false,
        },
      ],
    },
    {
      title: 'Is creation infinite?',
      type: 'Single selection',
      totalValue: 5105,
      answers: [
        {
          title: 'A bug in the checkout process',
          value: 4595,
          isCorrect: true,
        },
        {
          title: 'All Possible Answers',
          value: 510,
          isCorrect: false,
        },
      ],
    },
  ],
};
