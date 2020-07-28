import React, { useState, useEffect, ReactElement } from 'react';
import { Radio } from 'antd';

import cc from 'classcat';

import { IWMRadioGroup } from './interface';

import classes from './style.module.scss';

export interface IRadioButton {
  value: any;
  label: React.ReactNode;
  disabled?: boolean;
}

export default function WMVerticalRadioGroup({
  onChange,
  value,
  options,
  className,
  ...otherProps
}: IWMRadioGroup): ReactElement {
  const [localValue, setLocalValue] = useState(value);

  const localOnChange = (e: any) => {
    const val = e.target.value;

    setLocalValue(val);
    onChange && onChange(val);
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
        <Radio
          key={option.value}
          value={option.value}
          disabled={option.disabled}
          className={classes['wm-radio-button']}
        >
          {option.label}
        </Radio>
      ))}
    </Radio.Group>
  );
}
