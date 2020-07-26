import React, { ReactElement, ReactNode } from 'react';

import { ActionType, useCourseEditorContext } from '../../../providers/CourseEditorContext';

import TextCounter from '../../common/TextCounterInput';
import TextCounterTextarea from '../TextCounterTextarea';

import classes from './style.module.scss';

export default function QuizScreenForm({
  data,
  renderExtra,
}: {
  data: any;
  renderExtra?: ReactNode;
}): ReactElement {
  const [state, dispatch] = useCourseEditorContext();

  return (
    <div className={classes['quiz-screen-form']}>
      <TextCounter
        maxLength={80}
        placeholder="Text"
        label="Title"
        value={data.title}
        onChange={(e) => {
          data.title = e.target.value;
          dispatch({ type: ActionType.UpdateCourseOutline });
        }}
      />
      <TextCounterTextarea
        maxLength={210}
        placeholder="Text"
        label="Description"
        value={data.description}
        minRows={3}
        maxRows={5}
        onChange={(e) => {
          data.description = e.target.value;
          dispatch({ type: ActionType.UpdateCourseOutline });
        }}
      />
      {data.buttons.map((button: any, index: number) => (
        <TextCounter
          key={`quiz-form-button-${index}`}
          maxLength={80}
          placeholder="Text"
          label="Title"
          value={button.text}
          onChange={(e) => {
            data.buttons[index].text = e.target.value;
            dispatch({ type: ActionType.UpdateCourseOutline });
          }}
        />
      ))}
      {renderExtra}
    </div>
  );
}
