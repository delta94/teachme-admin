import React, { ReactElement } from 'react';
import cc from 'classcat';

import { Quiz } from '../../../../walkme/course/mappers/course/quiz';
import WMCollapse from '../../WMCollapse';
import { IconType } from '../../Icon';

import LessonHeader from '../LessonHeader';
import classes from './style.module.scss';
import CourseQuestionList from './CourseQuestionList';
import QuestionItem from './QuestionItem';

export default function CourseOutlineQuiz({
  item,
  forceRerender,
}: {
  item: Quiz;
  forceRerender: () => void;
}): ReactElement {
  const onInnerDrop = (e: any) => {
    const isAdd = e.addedIndex !== undefined && e.addedIndex !== null;
    const isRemove = e.removedIndex !== undefined && e.removedIndex !== null;
    const isReorder = isAdd && isRemove;

    if (isReorder) {
      item.questions.changeIndex(e.payload, e.addedIndex);
    } else if (isAdd) {
      item.questions.addNewItem(e.addedIndex, e.payload);
    } else if (isRemove) {
      item.questions.removeItem(e.payload);
    }

    forceRerender();
  };

  const shouldAcceptDrop = (e: any, payload: any) => !payload.type;

  return (
    <WMCollapse
      className={classes['quiz']}
      headerClassName={classes['quiz-header']}
      header={<LessonHeader title="Quiz" type={IconType.QuizSettings} />}
    >
      <QuestionItem
        item={{ title: 'Quiz Welcome Page' }}
        className={classes['welcome-screen-item']}
      />
      <CourseQuestionList
        items={item.questions.toArray()}
        onDrop={(e: any) => onInnerDrop(e)}
        getChildPayload={(index: number) => item.questions?.toArray()[index]}
        dragClass={classes['card-ghost']}
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: false,
          className: classes['drop-preview'],
        }}
        shouldAcceptDrop={shouldAcceptDrop}
        className={cc([{ [classes['is-empty']]: !item.questions.toArray().length }])}
      />
      <QuestionItem item={{ title: 'Summary - Success' }} />
      <QuestionItem item={{ title: 'Summary - Failure' }} />
    </WMCollapse>
  );
}
