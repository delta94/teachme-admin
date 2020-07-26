import React, { useState, useEffect, ReactElement, ReactNode } from 'react';
import { Radio } from 'antd';
import { RadioChangeEventTarget, RadioProps } from 'antd/es/radio';
import cc from 'classcat';

import classes from './style.module.scss';

export interface IRadioButton {
  value: any;
  label: React.ReactNode;
}

export interface IWMRadio extends RadioProps {
  value: any;
  label: ReactNode;
  className?: string;
}

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
      className={classes['wm-radio-button']}
      onChange={onChange}
      {...otherProps}
    >
      {label}
    </Radio>
  );
}
