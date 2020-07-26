import React, { ReactElement } from 'react';
import { QuizScreen, BaseQuizQuestion } from '@walkme/types';

import { QuizQuestion } from '../../../walkme/data/courseBuild/quiz/question';
import { useCourseEditorContext, ActionType } from '../../../providers/CourseEditorContext';

import DetailsPanel from '../DetailsPanel';
import Icon from '../Icon';

import classes from './style.module.scss';
import QuestionScreenForm from './QuestionScreenForm';
import QuizScreenForm from './QuizScreenForm';

export enum QuizScreenType {
  WelcomeScreen = 'welcome-screen',
  FailScreen = 'fail-screen',
  SuccessScreen = 'success-screen',
  QuestionScreen = 'question-screen',
}

const screenTitle = (type: QuizScreenType, data?: QuizScreen | QuizQuestion): string => {
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
  quizScreenData?: QuizScreen | QuizQuestion; // TODO: change to QuizQuestion type
  onClose: () => void;
}): ReactElement {
  const [state, dispatch] = useCourseEditorContext();
  const { course } = state;

  if (course?.quiz) {
    console.log('course?.quiz ', course?.quiz);
  }

  return (
    <DetailsPanel
      title={screenTitle(quizScreenType, quizScreenData)}
      titleIcon={<Icon type={`quiz-${quizScreenType}`} />}
      isOpen={Boolean(quizScreenData)}
      onClose={onClose}
      titleIsEllipsis
    >
      <div className={classes['quiz-edit']}>
        {quizScreenType !== QuizScreenType.QuestionScreen ? (
          <QuizScreenForm
            data={quizScreenData}
            renderExtra={
              quizScreenType === QuizScreenType.WelcomeScreen && (
                <p className={classes['info-text']}>
                  Note: This info will also be presented in the Quiz call-to-action banner, in the
                  user’s course page.
                </p>
              )
            }
          />
        ) : (
          <QuestionScreenForm data={quizScreenData as QuizQuestion} />
        )}
      </div>
    </DetailsPanel>
  );
}
