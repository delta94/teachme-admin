import React, { Dispatch, ReactElement, useState } from 'react';
import cc from 'classcat';

import { ActionType } from '../../../providers/CourseEditorContext';
import {
  ActiveDetailsItem,
  DetailsPanelSettingsType,
} from '../../../providers/CourseEditorContext/course-editor-context.interface';
import { CourseItemType } from '../../../interfaces/course.interfaces';

import DetailsPanel from '../../common/DetailsPanel';
import Icon, { IconType } from '../../common/Icon';

import { Course } from '../../../walkme/data/courseBuild/course';
import { Quiz } from '../../../walkme/data/courseBuild/quiz';
import QuizEditForm from './QuizEditForm';
import QuizSettingsForm from './QuizSettingsForm';
import { QuizScreenType } from './QuizEditForm/interface';
import CourseItemDetails from './CourseItemDetails';

import NewResourcePanel, { IResourceBaseData, IResourceVideoData } from './NewResourcePanel';

import classes from './style.module.scss';

export const TaskItemIconType = {
  [CourseItemType.Lesson]: 'LessonSmall',
  [CourseItemType.SmartWalkThru]: 'SmartWalkthruSmall',
  [CourseItemType.Article]: 'ArticleSmall',
  [CourseItemType.Video]: 'VideoSmall',
};

interface ICourseOutlineDetailsPanelProp {
  course: Course | null;
  quiz: Quiz | null;
  isDetailsPanelOpen: boolean;
  activeDetailsItem: ActiveDetailsItem | null;
  dispatch: Dispatch<any>;
}

export default function CourseOutlineDetailsPanel({
  course,
  quiz,
  isDetailsPanelOpen,
  activeDetailsItem,
  dispatch,
}: ICourseOutlineDetailsPanelProp): ReactElement {
  /**
   * TODO: uncomment the following lines when SDK is ready if necessary
   */

  // const [newResourceData, setNewResourceData] = useState<IResourceBaseData | IResourceVideoData>();
  // const [hasValidationError, setHasValidationError] = useState<boolean>(false);

  // const resourceIcon = activeDetailsItem && <Icon type={activeDetailsItem.type} />;

  // const isValidData = (data: IResourceBaseData | IResourceVideoData) => {
  //   const isEmptyStr = (val?: string) => val === '';

  //   return isEmptyStr(data.title) || isEmptyStr(data.url); // or check this option: !data.title.length
  // };

  // const onDataChange = (data: IResourceBaseData | IResourceVideoData) => {
  //   setHasValidationError(isValidData(data));

  //   setNewResourceData(data);
  // };

  const onClosePanel = () => {
    dispatch({ type: ActionType.CloseDetailsPanel });
  };

  const detailsPanelContent = {
    [DetailsPanelSettingsType.Item]: {
      id: 'Item',
      iconType: TaskItemIconType[activeDetailsItem?.item?.type as keyof typeof TaskItemIconType],
      title: activeDetailsItem?.item?.title ?? 'Item Settings',
      content: <CourseItemDetails courseItem={activeDetailsItem?.item} dispatch={dispatch} />,
    },
    [DetailsPanelSettingsType.Quiz]: {
      id: 'Quiz',
      iconType: 'QuizSettings',
      title: 'Quiz Settings',
      content: <QuizSettingsForm quiz={quiz} dispatch={dispatch} />,
    },
    [DetailsPanelSettingsType.Question]: {
      id: 'Question',
      iconType: `QuizQuestionScreen`,
      title: activeDetailsItem?.item?.title ?? 'Question Settings',
      content: (
        <QuizEditForm
          quizScreenType={QuizScreenType.QuestionScreen}
          quizScreenData={activeDetailsItem?.item}
          dispatch={dispatch}
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
          dispatch={dispatch}
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
          dispatch={dispatch}
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
          dispatch={dispatch}
        />
      ),
    },
    [CourseItemType.Video]: {
      id: 'Video',
      title: 'New Video',
      iconType: TaskItemIconType[CourseItemType.Video as keyof typeof TaskItemIconType],
      content: (
        <NewResourcePanel
          newResourceType={CourseItemType.Video}
          newResourceData={activeDetailsItem?.item}
        />
      ),
    },
    [CourseItemType.Article]: {
      id: 'Article',
      title: 'New Article',
      iconType: TaskItemIconType[CourseItemType.Article as keyof typeof TaskItemIconType],
      content: (
        <NewResourcePanel
          newResourceType={CourseItemType.Article}
          newResourceData={activeDetailsItem?.item}
        />
      ),
    },
  };

  const activeType = activeDetailsItem?.type ?? null;

  return (
    <DetailsPanel
      className={cc([
        classes['course-details-panel'],
        { [classes['is-open']]: isDetailsPanelOpen },
      ])}
      title={activeType && detailsPanelContent[activeType].title}
      titleIcon={
        activeType && (
          <Icon
            type={IconType[detailsPanelContent[activeType].iconType as keyof typeof IconType]}
            className={classes['details-panel-title-icon']}
          />
        )
      }
      isOpen={isDetailsPanelOpen}
      onClose={onClosePanel}
      titleIsEllipsis
    >
      {activeType && detailsPanelContent[activeType].content}
    </DetailsPanel>
  );
}
