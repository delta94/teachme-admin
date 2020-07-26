import React, { useState, useEffect, ReactElement } from 'react';
import { Radio } from 'antd';
import cc from 'classcat';

import WMVerticalRadioGroup from '../WMVerticalRadioGroup';

import { IWMRadio } from './interface';

import classes from './style.module.scss';

export default function WMRadio({
  onChange,
  value,
  label,
  className,
  ...otherProps
}: IWMRadio): ReactElement {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <Radio
      value={localValue}
      className={cc([classes['wm-radio-button'], className])}
      onChange={onChange}
      {...otherProps}
    >
      {label}
    </Radio>
  );
}

export { WMVerticalRadioGroup };
