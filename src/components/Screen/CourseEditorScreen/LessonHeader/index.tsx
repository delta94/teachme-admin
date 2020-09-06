import React, { ReactElement } from 'react';
import cc from 'classcat';

import Header from '../../../common/Header';
import Icon from '../../../common/Icon';

import LessonEditableTitle from './EditbaleLessonTitle';
import classes from './style.module.scss';

export interface ILessonHeader {
  type: string;
  lesson: any;
  className?: string;
}

export default function LessonHeader({ type, lesson, className }: ILessonHeader): ReactElement {
  return (
    <Header className={cc([classes['lesson-header'], className])}>
      <Icon type={type} />
      <LessonEditableTitle lesson={lesson} />
    </Header>
  );
}
