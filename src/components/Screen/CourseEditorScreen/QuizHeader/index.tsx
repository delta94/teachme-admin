import React, { ReactElement } from 'react';
import cc from 'classcat';

import { ActionType, useCourseEditorContext } from '../../../../providers/CourseEditorContext';
import { DetailsPanelSettingsType } from '../../../../providers/CourseEditorContext/course-editor-context.interface';
import WMButton from '../../../common/WMButton';
import Header from '../../../common/Header';
import Icon, { IconType } from '../../../common/Icon';

import classes from './style.module.scss';

export default function QuizHeader({ className }: { className?: string }): ReactElement {
  const [{ course, quiz, isDetailsPanelOpen }, dispatch] = useCourseEditorContext();

  const deleteQuiz = () => {
    course?.deleteQuiz();
    dispatch({ type: ActionType.DeleteQuiz });

    if (isDetailsPanelOpen) {
      dispatch({ type: ActionType.CloseDetailsPanel });
    }
  };

  const toggleSettings = () => {
    dispatch({
      type: ActionType.OpenDetailsPanel,
      activeDetailsItem: { type: DetailsPanelSettingsType.Quiz, id: quiz?.id ?? 0, item: quiz },
    });
  };

  return (
    <Header className={cc([classes['quiz-header'], className])} onClick={toggleSettings}>
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
