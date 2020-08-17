import React, { ReactElement, ReactNode } from 'react';
import cc from 'classcat';

import Icon, { IconType } from '../../common/Icon';

import classes from './style.module.scss';

interface ICourseQuizEmptyState {
  icon?: ReactNode;
  message?: string;
  isQuizOutline?: boolean;
}

export default function CourseQuizEmptyState({
  icon,
  message,
  isQuizOutline,
}: ICourseQuizEmptyState): ReactElement {
  return (
    <div
      className={cc([classes['course-quiz-empty'], { [classes['quiz-outline']]: isQuizOutline }])}
    >
      <span className={classes['title-wrapper']}>
        {isQuizOutline ? (
          <Icon className={classes['quiz-outline-empty-icon']} type={IconType.QuizOutlineEmpty} />
        ) : (
          <Icon className={classes['default-quiz-icon']} type={IconType.Quiz} />
        )}
        <span className={classes['title']}>No Quiz</span>
      </span>
      {message && <span className="message">{message}</span>}
    </div>
  );
}
