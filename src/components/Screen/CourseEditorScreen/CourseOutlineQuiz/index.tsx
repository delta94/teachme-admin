import React, { ReactElement } from 'react';
import cc from 'classcat';
import { QuizScreen, BaseQuizQuestion } from '@walkme/types';

import { useCourseEditorContext, ActionType } from '../../../../providers/CourseEditorContext';
import { Quiz } from '../../../../walkme/data/courseBuild/quiz';

import WMCollapse from '../../../common/WMCollapse';
import { IconType } from '../../../common/Icon';
import { QuizScreenType } from '../../../common/QuizEditForm';

import LessonHeader from '../LessonHeader';

import CourseQuestionList from './CourseQuestionList';
import QuestionItem from './QuestionItem';
import classes from './style.module.scss';

export default function CourseOutlineQuiz({
  item,
  quizItemClicked,
}: {
  item: Quiz;
  quizItemClicked: ({
    type,
    data,
  }: {
    type: QuizScreenType;
    data: QuizScreen | BaseQuizQuestion;
  }) => void;
}): ReactElement {
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

    dispatch({ type: ActionType.UpdateCourseOutline });
  };

  const shouldAcceptDrop = (e: any, payload: any) => !payload.type;

  return (
    <WMCollapse
      className={classes['quiz']}
      headerClassName={classes['quiz-header']}
      header={<LessonHeader title="Quiz" type={IconType.QuizSettings} />}
    >
      <QuestionItem
        item={{ title: 'Quiz Welcome Page', type: QuizScreenType.WelcomeScreen }}
        className={classes['welcome-screen-item']}
        onClick={() =>
          quizItemClicked({ type: QuizScreenType.WelcomeScreen, data: item.welcomeScreen })
        }
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
        handleQuestionClicked={(question) =>
          quizItemClicked({ type: QuizScreenType.QuestionScreen, data: question })
        }
      />
      <QuestionItem
        item={{ title: 'Summary - Success', type: QuizScreenType.SuccessScreen }}
        onClick={() =>
          quizItemClicked({ type: QuizScreenType.SuccessScreen, data: item.successScreen })
        }
      />
      <QuestionItem
        item={{ title: 'Summary - Failure', type: QuizScreenType.FailScreen }}
        onClick={() => quizItemClicked({ type: QuizScreenType.FailScreen, data: item.failScreen })}
      />
    </WMCollapse>
  );
}
