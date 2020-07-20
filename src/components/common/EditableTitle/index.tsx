import React, { useState, ReactElement, useRef, ChangeEvent, MouseEvent, useEffect } from 'react';
import cc from 'classcat';
import { Input } from 'antd';

import WMInput from '../WMInput';
import Icon, { IconType } from '../Icon';

import classes from './style.module.scss';

export enum EditableTitleType {
  Course = 'course',
  Lesson = 'lesson',
  Quiz = 'quiz',
}

const titleType = {
  course: EditableTitleType.Course,
  lesson: EditableTitleType.Lesson,
  quiz: EditableTitleType.Quiz,
};

export default function EditableTitle({
  type = EditableTitleType.Course,
  isNew,
  value,
  onBlur,
}: {
  type?: EditableTitleType;
  isNew: boolean;
  value: string;
  onBlur: (inputValue: string) => void;
}): ReactElement {
  const inputTitle = useRef<Input>(null);
  const [showInputText, setShowInputText] = useState(false);

  useEffect(() => {
    if (isNew && inputTitle.current && inputTitle.current) {
      inputTitle.current.select();
      setShowInputText(true);
    }
  }, [isNew]);

  const showInput = (e: MouseEvent<HTMLDivElement>) => {
    if (!inputTitle.current) return;

    e.stopPropagation();
    inputTitle.current.focus();
    setShowInputText(true);
  };

  const [inputValue, setInputValue] = useState(value);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  const onInputBlur = () => {
    onBlur(inputValue);
    setShowInputText(false);
  };

  return (
    <div className={classes['editable-title']}>
      {type === EditableTitleType.Course && (
        <Icon type={IconType.EventCourse} className={classes['course-icon']} />
      )}
      <div
        className={cc([
          classes['text-title'],
          classes[titleType[type as keyof typeof titleType]],
          { [classes['hidden']]: showInputText },
        ])}
        onClick={showInput}
      >
        {inputValue}
        <Icon type={IconType.Pencil} className={classes['pencil-icon']} />
      </div>
      <WMInput
        className={cc([
          classes['input-title'],
          classes[titleType[type as keyof typeof titleType]],
          { [classes['hidden']]: !showInputText },
        ])}
        ref={inputTitle}
        value={inputValue}
        onChange={onChange}
        onBlur={onInputBlur}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
