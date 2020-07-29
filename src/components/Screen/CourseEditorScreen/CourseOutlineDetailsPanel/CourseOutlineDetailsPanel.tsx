import React, { ReactElement } from 'react';

import { ActionType, useCourseEditorContext } from '../../../../providers/CourseEditorContext';
import DetailsPanel from '../../../common/DetailsPanel';
import Icon, { IconType } from '../../../common/Icon';
import QuizSettingsForm from '../QuizSettingsForm';

export default function CourseOutlineDetailsPanel(): ReactElement {
  const [state, dispatch] = useCourseEditorContext();
  const { isDetailsPanelOpen } = state;

  const onClosePanel = (callback?: () => void) => {
    dispatch({ type: ActionType.ToggleDetailsPanel });

    if (callback) {
      callback();
    }
  };

  const detailsPanel = [
    {
      id: 'QuizSettings',
      iconType: 'QuizSettings',
      title: 'Quiz Settings',
      content: <QuizSettingsForm courseId={state.course?.id ?? 0} />,
      onClose: () => console.log('closing'),
    },
  ];

  return (
    <DetailsPanel
      title={detailsPanel[0].title}
      titleIcon={<Icon type={IconType[detailsPanel[0].iconType as keyof typeof IconType]} />}
      isOpen={isDetailsPanelOpen}
      onClose={() => onClosePanel(detailsPanel[0].onClose)}
    >
      {detailsPanel[0].content}
    </DetailsPanel>
  );
}
