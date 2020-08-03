import React, { ReactElement } from 'react';
import { QuizScreen } from '@walkme/types';

import { QuizQuestion } from '../../../../walkme/data/courseBuild/quiz/question';

import classes from './style.module.scss';
import QuestionScreenForm from './QuestionScreenForm';
import QuizScreenForm from './QuizScreenForm';
import { QuizScreenType } from './interface';

export default function QuizEditForm({
  quizScreenType,
  quizScreenData,
}: {
  quizScreenType: QuizScreenType;
  quizScreenData: QuizScreen | QuizQuestion; // TODO: change to QuizQuestion type
}): ReactElement {
  return (
    <div className={classes['quiz-edit']}>
      {quizScreenType !== QuizScreenType.QuestionScreen ? (
        <QuizScreenForm
          screen={quizScreenData as QuizScreen}
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
        <QuestionScreenForm question={quizScreenData as QuizQuestion} />
      )}
    </div>
  );
}
