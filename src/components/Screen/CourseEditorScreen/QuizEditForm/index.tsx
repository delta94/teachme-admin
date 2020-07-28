import React, { ReactElement } from 'react';
import { QuizScreen } from '@walkme/types';

import { QuizQuestion } from '../../../../walkme/data/courseBuild/quiz/question';

import DetailsPanel from '../../../common/DetailsPanel';
import Icon from '../../../common/Icon';

import classes from './style.module.scss';
import QuestionScreenForm from './QuestionScreenForm';
import QuizScreenForm from './QuizScreenForm';
import { QuizScreenType } from './interface';
import { screenTitle } from './utils';

export default function QuizEditForm({
  quizScreenType,
  quizScreenData,
  onClose,
}: {
  quizScreenType: QuizScreenType;
  quizScreenData: QuizScreen | QuizQuestion; // TODO: change to QuizQuestion type
  onClose: () => void;
}): ReactElement {
  return (
    <DetailsPanel
      title={screenTitle(quizScreenType, quizScreenData.title)}
      titleIcon={<Icon type={`quiz-${quizScreenType}`} />}
      isOpen={Boolean(quizScreenData)}
      onClose={onClose}
      titleIsEllipsis
    >
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
    </DetailsPanel>
  );
}
