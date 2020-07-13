import React, { useState, ReactElement, useRef, ChangeEvent, useEffect } from 'react';
import cc from 'classcat';
import { Input } from 'antd';

import WMInput from '../WMInput';
import Icon, { IconType } from '../Icon';

import classes from './style.module.scss';

export default function EditableTitle({
  onBlur,
  value,
  isNew,
}: {
  onBlur: (inputValue: string) => void;
  value: string;
  isNew: boolean;
}): ReactElement {
  const [inputValue, setInputValue] = useState(value);
  const [showInputText, setShowInputText] = useState(false);

  const inputTitle = useRef<Input>(null);

  useEffect(() => {
    if (isNew && inputTitle.current && inputTitle.current) {
      inputTitle.current.select();
      setShowInputText(true);
    }
  }, [isNew]);

  const onInputBlur = () => {
    onBlur(value);
  };

  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setInputValue(ev.target.value);
  };

  const showInput = () => {
    if (!inputTitle.current) return;

    inputTitle.current.focus();
    setShowInputText(true);
  };

  return (
    <div className={classes['editable-title']}>
      <Icon type={IconType.EventCourse} className={classes['course-icon']} />
      <div
        className={cc([classes['text-title'], { [classes['hidden']]: showInputText }])}
        onClick={showInput}
      >
        {inputValue}
        <Icon type={IconType.Pencil} className={classes['pencil-icon']} />
      </div>
      <WMInput
        className={cc([classes['input-title'], { [classes['hidden']]: !showInputText }])}
        onBlur={onInputBlur}
        onChange={onChange}
        value={inputValue}
        ref={inputTitle}
      />
    </div>
  );
}
