import React, { ReactElement } from 'react';
import cc from 'classcat';

import { useCourseEditorContext, ActionType } from '../../../../providers/CourseEditorContext';
import { Quiz } from '../../../../walkme/data/courseBuild/quiz';

import WMCollapse from '../../../common/WMCollapse';
import { IconType } from '../../../common/Icon';

import LessonHeader from '../LessonHeader';

import CourseQuestionList from './CourseQuestionList';
import QuestionItem from './QuestionItem';
import classes from './style.module.scss';

export default function CourseOutlineQuiz({ item }: { item: Quiz }): ReactElement {
  const [state, dispatch] = useCourseEditorContext();

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

    dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
  };

  const shouldAcceptDrop = (e: any, payload: any) => !payload.type;

  return (
    <WMCollapse
      className={classes['quiz']}
      headerClassName={classes['quiz-header']}
      header={<div>Quiz</div>}
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
