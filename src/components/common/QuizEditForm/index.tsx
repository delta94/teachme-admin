import React, { ReactElement } from 'react';
import { QuizScreen, BaseQuizQuestion } from '@walkme/types';

import { useCourseEditorContext, ActionType } from '../../../providers/CourseEditorContext';

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
  quizScreenData,
  onClose,
}: {
  quizScreenType: QuizScreenType;
  quizScreenData?: QuizScreen | BaseQuizQuestion;
  onClose: () => void;
}): ReactElement {
  const [state, dispatch] = useCourseEditorContext();
  const { course } = state;

  const handleScreenDataChanged = (updatedData: any): void => {
    if (course && course.quiz) {
      switch (quizScreenType) {
        case QuizScreenType.WelcomeScreen:
          course.quiz.welcomeScreen = updatedData;
          break;
        case QuizScreenType.SuccessScreen:
          course.quiz.successScreen = updatedData;
          break;
        case QuizScreenType.FailScreen:
          course.quiz.failScreen = updatedData;
          break;
        default:
          throw new Error(`Unknown quiz screen type ${quizScreenType}`);
      }

      dispatch({ type: ActionType.UpdateCourseOutline });
    }
  };

  const ScreenForm = {
    [QuizScreenType.WelcomeScreen]: WelcomeScreenForm,
    [QuizScreenType.SuccessScreen]: SuccessScreenForm,
    [QuizScreenType.FailScreen]: FailScreenForm,
    [QuizScreenType.QuestionScreen]: QuestionScreenForm,
  };

  const ScreenFormComponent = ScreenForm[quizScreenType as keyof typeof ScreenForm];

  return (
    <DetailsPanel
      title={screenTitle(quizScreenType, quizScreenData)}
      titleIcon={<Icon type={`quiz-${quizScreenType}`} />}
      isOpen={Boolean(quizScreenData)}
      onClose={onClose}
    >
      <div className={classes['quiz-edit']}>
        {ScreenFormComponent && (
          <ScreenFormComponent
            data={
              quizScreenType === QuizScreenType.QuestionScreen
                ? (quizScreenData as BaseQuizQuestion)
                : (quizScreenData as QuizScreen)
            }
            handleDataChanged={handleScreenDataChanged}
          />
        )}
      </div>
    </DetailsPanel>
  );
}
