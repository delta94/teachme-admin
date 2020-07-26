import React, { ReactElement, ReactNode } from 'react';
import { QuizScreen } from '@walkme/types';

import { ActionType, useCourseEditorContext } from '../../../../providers/CourseEditorContext';

import TextCounter from '../../../common/TextCounterInput';
import TextCounterTextarea from '../../../common/TextCounterTextarea';

import classes from './style.module.scss';

export default function QuizScreenForm({
  screen,
  renderExtra,
}: {
  screen: QuizScreen;
  renderExtra?: ReactNode;
}): ReactElement {
  const [state, dispatch] = useCourseEditorContext();

  return (
    <div className={classes['quiz-screen-form']}>
      <TextCounter
        maxLength={80}
        placeholder="Text"
        label="Title"
        value={screen.title}
        onChange={(e) => {
          screen.title = e.target.value;
          dispatch({ type: ActionType.UpdateCourseOutline });
        }}
      />
      <TextCounterTextarea
        maxLength={210}
        placeholder="Text"
        label="Description"
        value={screen.description}
        minRows={3}
        maxRows={5}
        onChange={(e) => {
          screen.description = e.target.value;
          dispatch({ type: ActionType.UpdateCourseOutline });
        }}
      />
      {screen.buttons.map((button: any, index: number) => (
        <TextCounter
          key={`quiz-form-button-${index}`}
          maxLength={80}
          placeholder="Text"
          label="Title"
          value={button.text}
          onChange={(e) => {
            screen.buttons[index].text = e.target.value;
            dispatch({ type: ActionType.UpdateCourseOutline });
          }}
        />
      ))}
      {renderExtra}
    </div>
  );
}
