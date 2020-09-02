import React, { Dispatch, ReactElement, ReactNode } from 'react';
import { QuizScreen } from '@walkme/types';

import { ActionType } from '../../../../providers/CourseEditorContext';
import { fieldErrorMessage } from '../../../../utils';

import TextCounter from '../../../common/TextCounterInput';
import TextCounterTextarea from '../../../common/TextCounterTextarea';

import classes from './style.module.scss';

export default function QuizScreenForm({
  screen,
  isWelcomeScreen,
  renderExtra,
  dispatch,
}: {
  screen: QuizScreen;
  isWelcomeScreen: boolean;
  renderExtra?: ReactNode;
  dispatch: Dispatch<any>;
}): ReactElement {
  return (
    <div className={classes['quiz-screen-form']}>
      <TextCounter
        maxLength={80}
        placeholder="Text"
        label="Title"
        value={screen.title}
        errorMessage={fieldErrorMessage(screen.title)}
        onBlur={(e) => {
          screen.title = e.target.value;
          dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
        }}
      />
      <TextCounterTextarea
        maxLength={isWelcomeScreen ? 210 : 400}
        placeholder="Text"
        label="Description"
        value={screen.description}
        minRows={3}
        maxRows={5}
        onBlur={(e) => {
          screen.description = e.target.value;
          dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
        }}
      />
      {screen.buttons.map((button: any, index: number) => (
        <TextCounter
          key={`quiz-form-button-${index}`}
          maxLength={25}
          placeholder="Text"
          label="Button"
          value={button.text}
          errorMessage={fieldErrorMessage(button.text)}
          onBlur={(e) => {
            screen.buttons[index].text = e.target.value;
            dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
          }}
        />
      ))}
      {renderExtra}
    </div>
  );
}
