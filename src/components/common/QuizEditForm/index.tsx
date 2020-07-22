import React, { ReactElement, useState, ReactNode } from 'react';
import {
  Quiz,
  QuizScreen,
  QuizQuestion,
  BaseQuiz,
  BuildQuiz,
  BaseQuizQuestion,
} from '@walkme/types';
import cc from 'classcat';

import DetailsPanel from '../DetailsPanel';
import Icon, { IconType } from '../Icon';

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

const screenTitleIcon = (type: QuizScreenType): ReactNode => {
  switch (type) {
    case QuizScreenType.WelcomeScreen:
      return <Icon type={IconType.QuizSettings} />; // TODO: change to the correct icon
    case QuizScreenType.SuccessScreen:
      return <Icon type={IconType.QuizSettings} />; // TODO: change to the correct icon
    case QuizScreenType.FailScreen:
      return <Icon type={IconType.QuizSettings} />; // TODO: change to the correct icon
    case QuizScreenType.QuestionScreen:
      return <Icon type={IconType.QuizSettings} />; // TODO: change to the correct icon
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
  const [originalQuiz, setOriginalQuiz] = useState(quizData);
  const [screenData, setScreenData] = useState(quizScreenData as QuizScreen | BaseQuizQuestion);

  return (
    <DetailsPanel
      title={screenTitle(quizScreenType, quizScreenData)}
      titleIcon={screenTitleIcon(quizScreenType)}
      isOpen={Boolean(quizScreenData)}
      onClose={onClose}
    >
      <div className={classes['quiz-edit']}>
        {(() => {
          switch (quizScreenType) {
            case QuizScreenType.WelcomeScreen:
              return <WelcomeScreenForm data={quizScreenData as QuizScreen} />;
            case QuizScreenType.SuccessScreen:
              return <SuccessScreenForm data={quizScreenData as QuizScreen} />;
            case QuizScreenType.FailScreen:
              return <FailScreenForm data={quizScreenData as QuizScreen} />;
            case QuizScreenType.QuestionScreen:
              return <QuestionScreenForm data={quizScreenData as BaseQuizQuestion} />;
            default:
              return <></>;
          }
        })()}
      </div>
    </DetailsPanel>
  );
}
