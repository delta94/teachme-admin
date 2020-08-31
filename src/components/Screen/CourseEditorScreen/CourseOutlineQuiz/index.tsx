import React, { ReactElement, useEffect, useRef } from 'react';
import cc from 'classcat';

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
  quiz,
  isNew,
}: {
  quiz: Quiz;
  isNew?: boolean;
}): ReactElement {
  const [{ activeDetailsItem }, dispatch] = useCourseEditorContext();
  const quizRef = useRef<HTMLDivElement>(null);

  const onInnerDrop = (e: any) => {
    const isAdd = e.addedIndex !== undefined && e.addedIndex !== null;
    const isRemove = e.removedIndex !== undefined && e.removedIndex !== null;
    const isReorder = isAdd && isRemove;

    if (isReorder) {
      quiz.questions.changeIndex(e.payload, e.addedIndex);
    } else if (isAdd) {
      quiz.questions.addNewItem(e.addedIndex, e.payload);
    } else if (isRemove) {
      quiz.questions.removeItem(e.payload);
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
    const questionToDelete = quiz.questions.getItem(questionIndex);
    const shouldResetActiveDetailsPanel = activeDetailsItem?.id === questionToDelete.id;
    quiz.questions.removeItem(questionToDelete);

    dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });

    // on delete activeDetailsItem should close the details pane
    if (shouldResetActiveDetailsPanel) dispatch({ type: ActionType.CloseDetailsPanel });
  };

  useEffect(() => {
    // detecting new quiz added and scroll to element
    if (isNew) {
      quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [quiz, isNew]);

  return (
    <WMCollapse
      className={classes['quiz']}
      headerClassName={cc([
        classes['quiz-header'],
        { [classes['is-active']]: activeDetailsItem?.type === DetailsPanelSettingsType.Quiz },
      ])}
      header={<QuizHeader className={classes['item-with-settings']} />}
      ref={quizRef}
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
          onItemClick({ type: DetailsPanelSettingsType.QuizWelcome, data: quiz.welcomeScreen })
        }
        isValid={quiz.welcomeScreen.isValid()}
      />
      <CourseQuestionList
        items={quiz.questions.toArray()}
        onDrop={(e: any) => onInnerDrop(e)}
        getChildPayload={(index: number) => quiz.questions?.toArray()[index]}
        dragClass={classes['card-ghost']}
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: false,
          className: classes['drop-preview'],
        }}
        shouldAcceptDrop={shouldAcceptDrop}
        className={cc([
          {
            [classes['is-empty']]: !quiz.questions.toArray().length,
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
          onItemClick({ type: DetailsPanelSettingsType.QuizSuccess, data: quiz.successScreen })
        }
        isValid={quiz.successScreen.isValid()}
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
          onItemClick({ type: DetailsPanelSettingsType.QuizFail, data: quiz.failScreen })
        }
        isValid={quiz.failScreen.isValid()}
      />
    </WMCollapse>
  );
}
