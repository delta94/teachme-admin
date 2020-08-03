import React, { ReactElement } from 'react';

import { ActionType, useCourseEditorContext } from '../../../../providers/CourseEditorContext';
import { DetailsPanelSettingsType } from '../../../../providers/CourseEditorContext/course-editor-context.interface';
import { CourseItemType } from '../../../../interfaces/course.interfaces';
import DetailsPanel from '../../../common/DetailsPanel';
import Icon, { IconType } from '../../../common/Icon';
import QuizEditForm from '../QuizEditForm';
import QuizSettingsForm from '../QuizSettingsForm';
import { QuizScreenType } from '../QuizEditForm/interface';
import CourseItemDetails from '../CourseItemDetails';

import classes from './style.module.scss';

export const taksItemIconType = {
  [CourseItemType.Lesson]: 'LessonSmall',
  [CourseItemType.SmartWalkThru]: 'SmartWalkthruSmall',
  [CourseItemType.Article]: 'ArticleSmall',
  [CourseItemType.Video]: 'VideoSmall',
};

export default function CourseOutlineDetailsPanel(): ReactElement {
  const [{ course, isDetailsPanelOpen, activeDetailsItem }, dispatch] = useCourseEditorContext();

  const onClosePanel = () => {
    dispatch({ type: ActionType.CloseDetailsPanel });
  };

  const detailsPanelContent = {
    [DetailsPanelSettingsType.Item]: {
      id: 'Item',
      iconType: taksItemIconType[activeDetailsItem?.item.type as keyof typeof taksItemIconType],
      title: activeDetailsItem?.item.title ?? 'Item Settings',
      content: <CourseItemDetails courseItem={activeDetailsItem?.item} />,
    },
    [DetailsPanelSettingsType.Quiz]: {
      id: 'Quiz',
      iconType: 'QuizSettings',
      title: 'Quiz Settings',
      content: <QuizSettingsForm courseId={course?.id ?? 0} />,
    },
    [DetailsPanelSettingsType.Question]: {
      id: 'Question',
      iconType: `QuizQuestionScreen`,
      title: activeDetailsItem?.item.title ?? 'Question Settings',
      content: (
        <QuizEditForm
          quizScreenType={QuizScreenType.QuestionScreen}
          quizScreenData={activeDetailsItem?.item}
        />
      ),
    },
    [DetailsPanelSettingsType.QuizWelcome]: {
      id: 'QuizWelcome',
      iconType: `QuizWelcomeScreen`,
      title: 'Quiz Welcome Settings',
      content: (
        <QuizEditForm
          quizScreenType={QuizScreenType.WelcomeScreen}
          quizScreenData={activeDetailsItem?.item}
        />
      ),
    },
    [DetailsPanelSettingsType.QuizFail]: {
      id: 'QuizFail',
      iconType: `QuizFailScreen`,
      title: 'Quiz Fail Settings',
      content: (
        <QuizEditForm
          quizScreenType={QuizScreenType.FailScreen}
          quizScreenData={activeDetailsItem?.item}
        />
      ),
    },
    [DetailsPanelSettingsType.QuizSuccess]: {
      id: 'QuizSuccess',
      iconType: `QuizSuccessScreen`,
      title: 'Quiz Success Settings',
      content: (
        <QuizEditForm
          quizScreenType={QuizScreenType.SuccessScreen}
          quizScreenData={activeDetailsItem?.item}
        />
      ),
    },
  };

  const activeType = activeDetailsItem?.type ?? null;

  return (
    <>
      {activeType && (
        <DetailsPanel
          title={detailsPanelContent[activeType].title}
          titleIcon={
            <Icon
              type={IconType[detailsPanelContent[activeType].iconType as keyof typeof IconType]}
              className={classes['details-panel-title-icon']}
            />
          }
          isOpen={isDetailsPanelOpen}
          onClose={onClosePanel}
          titleIsEllipsis
        >
          {detailsPanelContent[activeType].content}
        </DetailsPanel>
      )}
    </>
  );
}