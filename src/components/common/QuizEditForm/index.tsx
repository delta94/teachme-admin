import React, { ReactElement } from 'react';
import { QuizScreen, BuildQuiz, BaseQuizQuestion } from '@walkme/types';

import DetailsPanel from '../DetailsPanel';
import Icon from '../Icon';

import classes from './style.module.scss';
import SuccessScreenForm from './SuccessScreenForm';
import WelcomeScreenForm from './WelcomeScreenForm';
import FailScreenForm from './FailScreenForm';
import QuestionScreenForm from './QuestionScreenForm';

export enum QuizScreenType {
  WelcomeScreen = 'welcome-screen',
  FailScreen = 'fail-screen',
  SuccessScreen = 'success-screen',
  QuestionScreen = 'question-screen',
}

const screenTitle = (type: QuizScreenType, data?: QuizScreen | BaseQuizQuestion): string => {
  switch (type) {
    case QuizScreenType.WelcomeScreen:
      return 'Quiz Welcome Page';
    case QuizScreenType.SuccessScreen:
      return 'Quiz Success Page';
    case QuizScreenType.FailScreen:
      return 'Quiz Fail Page';
    case QuizScreenType.QuestionScreen:
      return data ? data.title : '';
    default:
      throw new Error(`Unknown quiz screen type ${type}`);
  }
};

export default function QuizEditForm({
  quizScreenType,
  quizData,
  quizScreenData,
  onClose,
}: {
  quizScreenType: QuizScreenType;
  quizData?: BuildQuiz;
  quizScreenData?: QuizScreen | BaseQuizQuestion;
  onClose: () => void;
}): ReactElement {
  const ScreenForm = {
    [QuizScreenType.WelcomeScreen]: WelcomeScreenForm,
    [QuizScreenType.SuccessScreen]: SuccessScreenForm,
    [QuizScreenType.FailScreen]: FailScreenForm,
    [QuizScreenType.QuestionScreen]: QuestionScreenForm,
  };

  const QuizScreenForm = ScreenForm[quizScreenType as keyof typeof ScreenForm];

  return (
    <DetailsPanel
      title={screenTitle(quizScreenType, quizScreenData)}
      titleIcon={<Icon type={quizScreenType} />}
      isOpen={Boolean(quizScreenData)}
      onClose={onClose}
    >
      <div className={classes['quiz-edit']}>
        {QuizScreenForm && <QuizScreenForm data={quizScreenData} />}
      </div>
    </DetailsPanel>
  );
}
