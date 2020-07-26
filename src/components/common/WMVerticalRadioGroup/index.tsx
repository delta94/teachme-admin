import React, { useState, useEffect, ReactElement } from 'react';
import { Radio } from 'antd';
import { RadioProps } from 'antd/es/radio';
import cc from 'classcat';

import classes from './style.module.scss';

export interface IRadioButton {
  value: any;
  label: React.ReactNode;
}

export interface IWMRadio extends Omit<RadioProps, 'onChange'> {
  value: any;
  onChange: (value: number | string) => void;
  options: Array<IRadioButton>;
  className?: string;
}

export default function WMVerticalRadioGroup({
  onChange,
  value,
  options,
  className,
  ...otherProps
}: IWMRadio): ReactElement {
  const [localValue, setLocalValue] = useState(value);

  const localOnChange = (e: any) => {
    const val = e.target.value;

    setLocalValue(val);
    onChange(val);
  };

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <Radio.Group
      className={cc([classes['wm-radio-group'], className])}
      onChange={localOnChange}
      value={localValue}
      {...otherProps}
    >
      {options.map((option) => (
        <Radio key={option.value} value={option.value} className={classes['radio-button']}>
          {option.label}
        </Radio>
      ))}
    </Radio.Group>
  );
}
