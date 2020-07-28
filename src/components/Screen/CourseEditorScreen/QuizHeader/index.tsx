import React, { ReactElement } from 'react';
import cc from 'classcat';

import Header from '../../../common/Header';
import Icon, { IconType } from '../../../common/Icon';

import { ActionType, useCourseEditorContext } from '../../../../providers/CourseEditorContext';
import WMButton from '../../../common/WMButton';
import classes from './style.module.scss';

export default function QuizHeader({ className }: { className?: string }): ReactElement {
  const [{ course }, dispatch] = useCourseEditorContext();

  const deleteQuiz = () => {
    course?.deleteQuiz();
    dispatch({ type: ActionType.DeleteQuiz });
  };

  return (
    <Header className={cc([classes['quiz-header'], className])}>
      <Icon type={IconType.QuizSettings} />
      <div className={cc([classes['editable-quiz-title']])}>
        <div className={classes['text']}>
          <span className={classes['quiz-title-text']}>Quiz</span>
          <WMButton
            onMouseDown={deleteQuiz}
            className={classes['title-button']}
            onClick={deleteQuiz}
          >
            <Icon type={IconType.Delete} className={classes['title-icon']} />
          </WMButton>
        </div>
      </div>
    </Header>
  );
}
