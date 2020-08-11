import React, { ChangeEvent, MouseEvent, ReactElement, useRef, useState } from 'react';
import cc from 'classcat';
import { Input } from 'antd';

import { ActionType, useCourseEditorContext } from '../../../../providers/CourseEditorContext';
import WMInput from '../../../common/WMInput';
import WMButton from '../../../common/WMButton';

import Icon, { IconType } from '../../../common/Icon';
import classes from './style.module.scss';
import LessonDeleteButton from './LessonDeleteButton';

export default function LessonEditableTitle({ lesson }: { lesson?: any }): ReactElement {
  const [{ course }, dispatch] = useCourseEditorContext();

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
      <div className={cc([classes['text'], { [classes['hidden']]: showInput }])}>
        <span className={classes['lesson-title-text']}>{lesson?.title ?? ''}</span>
        <WMButton
          onClick={setInputActive}
          className={cc([classes['title-button'], { [classes['hidden']]: showInput }])}
        >
          <Icon type={IconType.PencilSmall} className={classes['title-icon']} />
        </WMButton>
        <LessonDeleteButton lesson={lesson} showInput={showInput} />
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
        {/* onMouseDown is required to allow both an onBlur event and after that another button event */}
        <WMButton onMouseDown={onApprove} className={classes['title-button']}>
          <Icon type={IconType.V} className={classes['title-icon']} />
        </WMButton>
        <WMButton onMouseDown={onBlur} className={classes['title-button']}>
          <Icon type={IconType.X} className={classes['title-icon']} />
        </WMButton>
      </div>
    </div>
  );
}
