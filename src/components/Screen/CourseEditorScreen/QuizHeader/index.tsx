import React, { ReactElement } from 'react';
import cc from 'classcat';

import Header from '../../../common/Header';
import Icon, { IconType } from '../../../common/Icon';

import { ActionType, useCourseEditorContext } from '../../../../providers/CourseEditorContext';
import WMButton from '../../../common/WMButton';
import classes from './style.module.scss';

export default function QuizHeader({ className }: { className?: string }): ReactElement {
  const [{ course }, dispatch] = useCourseEditorContext();

  const deleteLesson = () => {
    course?.deleteQuiz();
    dispatch({ type: ActionType.DeleteQuiz });
  };

  return (
    <Header className={cc([classes['lesson-header'], className])}>
      <Icon type={IconType.QuizSettings} />
      <div className={cc([classes['editable-lesson-title']])}>
        <div className={classes['text']}>
          <span className={classes['lesson-title-text']}>Quiz</span>
          <WMButton
            onMouseDown={deleteLesson}
            className={classes['title-button']}
            onClick={deleteLesson}
          >
            <Icon type={IconType.Delete} className={classes['title-icon']} />
          </WMButton>
        </div>
      </div>
    </Header>
  );
}
