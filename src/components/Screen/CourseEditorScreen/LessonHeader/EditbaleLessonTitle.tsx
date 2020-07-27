import React, { ChangeEvent, MouseEvent, ReactElement, useRef, useState } from 'react';
import cc from 'classcat';
import { Input } from 'antd';

import { ActionType, useCourseEditorContext } from '../../../../providers/CourseEditorContext';
import WMInput from '../../../common/WMInput';
import WMButton, { ButtonVariantEnum } from '../../../common/WMButton';

import classes from './style.module.scss';

export default function LessonEditableTitle({ lesson }: { lesson?: any }): ReactElement {
  const [state, dispatch] = useCourseEditorContext();

  const inputTitle = useRef<Input>(null);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState(lesson?.title ?? '');

  const setInputActive = (e: MouseEvent<HTMLDivElement>) => {
    if (!inputTitle.current) return;

    setInputValue(lesson?.title ?? '');
    inputTitle.current.focus();
    setShowInput(true);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  const onBlur = (e: any) => {
    inputTitle?.current?.blur();
    setShowInput(false);
  };

  const onApprove = (e: any) => {
    if (lesson) {
      lesson.title = inputValue;
    }
    dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
  };

  return (
    <div className={cc([classes['editable-lesson-title']])}>
      <div
        className={cc([classes['text'], { [classes['hidden']]: showInput }])}
        onClick={setInputActive}
      >
        {lesson?.title ?? ''}
      </div>
      <div className={cc([classes['input-wrapper'], { [classes['hidden']]: !showInput }])}>
        <WMInput
          className={cc([classes.input])}
          ref={inputTitle}
          value={inputValue}
          onChange={onChange}
          onBlur={onBlur}
          maxLength={50}
        />
        <WMButton variant={ButtonVariantEnum.Secondary} shape="round" onMouseDown={onApprove}>
          V
        </WMButton>
        <WMButton variant={ButtonVariantEnum.Secondary} shape="round" onMouseDown={onBlur}>
          X
        </WMButton>
      </div>
    </div>
  );
}
