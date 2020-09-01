import React, { Dispatch, ReactElement } from 'react';
import cc from 'classcat';

import { Course } from '../../../../walkme/data/courseBuild/course';
import Header from '../../../common/Header';
import Icon from '../../../common/Icon';

import LessonEditableTitle from './EditbaleLessonTitle';
import classes from './style.module.scss';

export interface ILessonHeader {
  type: string;
  lesson: any;
  course: Course | null;
  dispatch: Dispatch<any>;
  className?: string;
}

export default function LessonHeader({
  type,
  lesson,
  course,
  dispatch,
  className,
}: ILessonHeader): ReactElement {
  return (
    <Header className={cc([classes['lesson-header'], className])}>
      <Icon type={type} />
      <LessonEditableTitle lesson={lesson} course={course} dispatch={dispatch} />
    </Header>
  );
}
