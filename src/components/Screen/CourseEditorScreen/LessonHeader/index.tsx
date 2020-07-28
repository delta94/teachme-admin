import React, { ReactElement } from 'react';
import cc from 'classcat';

import Header from '../../../common/Header';
import Icon from '../../../common/Icon';

import classes from './style.module.scss';

export interface ILessonHeader {
  title: string;
  type: string;
  className?: string;
}

export default function LessonHeader({ title, type, className }: ILessonHeader): ReactElement {
  return (
    <Header className={cc([classes['lesson-header'], className])}>
      <Icon type={type} />
      {title}
    </Header>
  );
}
