import React, { ReactElement, useState } from 'react';
import cc from 'classcat';
import { QuizScreen } from '@walkme/types';

import { useCourseEditorContext, ActionType } from '../../../../providers/CourseEditorContext';
import { Quiz } from '../../../../walkme/data/courseBuild/quiz';
import { QuizQuestion } from '../../../../walkme/data/courseBuild/quiz/question';
import { DetailsPanelSettingsType } from '../../../../providers/CourseEditorContext/course-editor-context.interface';
import WMCollapse from '../../../common/WMCollapse';
import { QuizScreenType } from '../QuizEditForm/interface';
import QuizHeader from '../QuizHeader';

import CourseQuestionList from './CourseQuestionList';
import QuestionItem from './QuestionItem';
import classes from './style.module.scss';

export default function CourseOutlineQuiz({
  item,
  selectedOutlineItem,
}: {
  item: Quiz;

  selectedOutlineItem?: { type: QuizScreenType; id?: number };
}): ReactElement {
  const [{ activeDetailsItem }, dispatch] = useCourseEditorContext();

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

  const onItemClick = ({ type, data }: { type: DetailsPanelSettingsType; data: any }) => {
    dispatch({
      type: ActionType.OpenDetailsPanel,
      activeDetailsItem: { type, id: data.id as number, item: data },
    });
  };

  const onQuestionDelete = (questionIndex: number) => {
    const questionToRemove = item.questions.getItem(questionIndex);
    const shouldResetActiveDetailsPanel = activeDetailsItem?.id === questionToRemove.id;
    item.questions.removeItem(questionToRemove);

    dispatch({
      type: ActionType.UpdateCourseOutline,
      updateHasChange: true,
      closeDetailsPanel: shouldResetActiveDetailsPanel,
    });
  };

  return (
    <WMCollapse
      className={classes['quiz']}
      headerClassName={classes['quiz-header']}
      header={<QuizHeader className={classes['item-with-settings']} />}
    >
      <QuestionItem
        item={{ title: 'Quiz Welcome Page', type: QuizScreenType.WelcomeScreen }}
        className={cc([
          classes['welcome-screen-item'],
          classes['item-with-settings'],
          {
            [classes['active-item']]:
              activeDetailsItem?.type === DetailsPanelSettingsType.QuizWelcome,
          },
        ])}
        onClick={() =>
          onItemClick({ type: DetailsPanelSettingsType.QuizWelcome, data: item.welcomeScreen })
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
        className={cc([
          {
            [classes['is-empty']]: !item.questions.toArray().length,
          },
        ])}
        activeQuestionId={
          activeDetailsItem?.type === DetailsPanelSettingsType.Question
            ? activeDetailsItem?.id
            : undefined
        }
        onQuestionClick={(question: QuizQuestion) => {
          onItemClick({ type: DetailsPanelSettingsType.Question, data: question });
        }}
        onQuestionDelete={(questionIndex) => {
          onQuestionDelete(questionIndex);
        }}
      />
      <QuestionItem
        item={{ title: 'Summary - Success', type: QuizScreenType.SuccessScreen }}
        className={cc([
          classes['success-screen-item'],
          classes['item-with-settings'],
          {
            [classes['active-item']]:
              activeDetailsItem?.type === DetailsPanelSettingsType.QuizSuccess,
          },
        ])}
        onClick={() =>
          onItemClick({ type: DetailsPanelSettingsType.QuizSuccess, data: item.successScreen })
        }
      />
      <QuestionItem
        item={{ title: 'Summary - Failure', type: QuizScreenType.FailScreen }}
        className={cc([
          classes['fail-screen-item'],
          classes['item-with-settings'],
          {
            [classes['active-item']]: activeDetailsItem?.type === DetailsPanelSettingsType.QuizFail,
          },
        ])}
        onClick={() =>
          onItemClick({ type: DetailsPanelSettingsType.QuizFail, data: item.failScreen })
        }
      />
    </WMCollapse>
  );
}
