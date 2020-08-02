import React, { ReactElement } from 'react';

import { ActionType, useCourseEditorContext } from '../../../../providers/CourseEditorContext';
import DetailsPanel from '../../../common/DetailsPanel';
import Icon, { IconType } from '../../../common/Icon';
import QuizSettingsForm from '../QuizSettingsForm';
import { DetailsPanelSettingsType } from '../../../../providers/CourseEditorContext/course-editor-context.interface';

export default function CourseOutlineDetailsPanel(): ReactElement {
  const [{ course, isDetailsPanelOpen, activeDetailsItem }, dispatch] = useCourseEditorContext();

  const onClosePanel = (callback?: () => void) => {
    dispatch({ type: ActionType.CloseDetailsPanel });

    if (callback) {
      callback();
    }
  };

  const detailsPanel = {
    [DetailsPanelSettingsType.Item]: {
      id: 'Item',
      iconType: 'ItemSettings',
      title: 'Item Settings',
      content: <div>Item</div>,
      onClose: () => console.log('closing'),
    },
    [DetailsPanelSettingsType.Quiz]: {
      id: 'Quiz',
      iconType: 'QuizSettings',
      title: 'Quiz Settings',
      content: <QuizSettingsForm courseId={course?.id ?? 0} />,
      onClose: () => console.log('closing'),
    },
    [DetailsPanelSettingsType.Question]: {
      id: 'Question',
      iconType: 'QuestionSettings',
      title: 'Question Settings',
      content: <div>Question</div>,
      onClose: () => console.log('closing'),
    },
    [DetailsPanelSettingsType.QuizWelcome]: {
      id: 'QuizWelcome',
      iconType: 'QuizWelcomeSettings',
      title: 'Quiz Welcome Settings',
      content: <div>Quiz Welcome Settings</div>,
      onClose: () => console.log('closing'),
    },
    [DetailsPanelSettingsType.QuizFail]: {
      id: 'QuizFail',
      iconType: 'QuizFailSettings',
      title: 'Quiz Fail Settings',
      content: <div>Quiz Fail Settings</div>,
      onClose: () => console.log('closing'),
    },
    [DetailsPanelSettingsType.QuizSuccess]: {
      id: 'QuizSuccess',
      iconType: 'QuizSuccessSettings',
      title: 'Quiz Success Settings',
      content: <div>Quiz Success Settings</div>,
      onClose: () => console.log('closing'),
    },
  };

  const activeType = activeDetailsItem?.type ?? null;

  return (
    <>
      {activeType && (
        <DetailsPanel
          title={detailsPanel[activeType].title}
          titleIcon={
            <Icon type={IconType[detailsPanel[activeType].iconType as keyof typeof IconType]} />
          }
          isOpen={isDetailsPanelOpen}
          onClose={() => onClosePanel(detailsPanel[activeType].onClose)}
        >
          {detailsPanel[activeType].content}
        </DetailsPanel>
      )}
    </>
  );
}
