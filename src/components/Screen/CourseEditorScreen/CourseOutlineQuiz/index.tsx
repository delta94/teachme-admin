import React, { ReactElement, useState } from 'react';
import cc from 'classcat';
import { QuizScreen } from '@walkme/types';

import { useCourseEditorContext, ActionType } from '../../../../providers/CourseEditorContext';
import { Quiz } from '../../../../walkme/data/courseBuild/quiz';
import { QuizQuestion } from '../../../../walkme/data/courseBuild/quiz/question';

import WMCollapse from '../../../common/WMCollapse';
import { IconType } from '../../../common/Icon';
import { QuizScreenType } from '../../../common/QuizEditForm';

import LessonHeader from '../LessonHeader';

import CourseQuestionList from './CourseQuestionList';
import QuestionItem from './QuestionItem';
import classes from './style.module.scss';

export default function CourseOutlineQuiz({
  item,
  quizItemClick,
  selectedOutlineItem,
}: {
  item: Quiz;
  quizItemClick: ({
    type,
    data,
  }: {
    type: QuizScreenType;
    data: QuizScreen | QuizQuestion;
  }) => void;
  selectedOutlineItem?: { type: QuizScreenType; id?: number };
}): ReactElement {
  const [state, dispatch] = useCourseEditorContext();
  const [activeOutlineItem, setActiveOutlineItem] = useState(selectedOutlineItem);

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

  const onItemClick = ({ type, data }: { type: QuizScreenType; data: any }) => {
    setActiveOutlineItem({ type, id: data.id });
    quizItemClick({
      type,
      data,
    });
  };

  return (
    <WMCollapse
      className={classes['quiz']}
      headerClassName={classes['quiz-header']}
      header={<LessonHeader title="Quiz" type={IconType.QuizSettings} />}
    >
      <QuestionItem
        item={{ title: 'Quiz Welcome Page', type: QuizScreenType.WelcomeScreen }}
        className={cc([
          classes['welcome-screen-item'],
          { [classes['active-item']]: activeOutlineItem?.type === QuizScreenType.WelcomeScreen },
        ])}
        onClick={() =>
          onItemClick({ type: QuizScreenType.WelcomeScreen, data: item.welcomeScreen })
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
        activeQuestionId={activeOutlineItem?.id}
        onQuestionClick={(question: QuizQuestion) =>
          onItemClick({ type: QuizScreenType.QuestionScreen, data: question })
        }
      />
      <QuestionItem
        item={{ title: 'Summary - Success', type: QuizScreenType.SuccessScreen }}
        className={cc([
          classes['success-screen-item'],
          { [classes['active-item']]: activeOutlineItem?.type === QuizScreenType.SuccessScreen },
        ])}
        onClick={() =>
          onItemClick({ type: QuizScreenType.SuccessScreen, data: item.successScreen })
        }
      />
      <QuestionItem
        item={{ title: 'Summary - Failure', type: QuizScreenType.FailScreen }}
        className={cc([
          classes['fail-screen-item'],
          { [classes['active-item']]: activeOutlineItem?.type === QuizScreenType.FailScreen },
        ])}
        onClick={() => onItemClick({ type: QuizScreenType.FailScreen, data: item.failScreen })}
      />
    </WMCollapse>
  );
}
