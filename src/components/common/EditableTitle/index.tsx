import React, { useState, ReactElement, useRef, ChangeEvent, MouseEvent, useEffect } from 'react';
import cc from 'classcat';
import { Input } from 'antd';

import WMInput from '../WMInput';
import Icon, { IconType } from '../Icon';
import { WMSkeletonInput } from '../WMSkeleton';

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
  isLoading,
  value,
  onBlur,
}: {
  type?: EditableTitleType;
  isNew: boolean;
  isLoading: boolean;
  value: string;
  onBlur: (inputValue: string) => void;
}): ReactElement {
  const inputTitle = useRef<Input>(null);
  const [showInputText, setShowInputText] = useState(false);

  useEffect(() => {
    if (isNew && !isLoading && inputTitle.current) {
      setTimeout(() => inputTitle.current?.select(), 100);
      setShowInputText(true);
    }
  }, [isNew, isLoading]);

  const showInput = (e: MouseEvent<HTMLDivElement>) => {
    if (!inputTitle.current) return;

    e.stopPropagation();
    inputTitle.current.focus();
    setShowInputText(true);
  };

  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  const onInputBlur = () => {
    onBlur(inputValue);
    setShowInputText(false);
  };

  const isCourseTitle = type === EditableTitleType.Course;

  return (
    <div className={classes['editable-title']}>
      {isLoading ? (
        <WMSkeletonInput className={classes['skeleton']} />
      ) : (
        <>
          {isCourseTitle && <Icon type={IconType.EventCourse} className={classes['course-icon']} />}
          <div
            className={cc([
              classes['text'],
              classes[titleType[type as keyof typeof titleType]],
              { [classes['hidden']]: showInputText },
            ])}
            onClick={showInput}
          >
            {inputValue}
            {isCourseTitle && <Icon type={IconType.Pencil} className={classes['pencil-icon']} />}
          </div>
          <WMInput
            className={cc([
              classes['input'],
              classes[titleType[type as keyof typeof titleType]],
              { [classes['hidden']]: !showInputText },
            ])}
            ref={inputTitle}
            value={inputValue}
            onChange={onChange}
            onBlur={onInputBlur}
            onClick={(e) => e.stopPropagation()}
            maxLength={isCourseTitle ? 50 : undefined}
          />
        </>
      )}
    </div>
  );
}
