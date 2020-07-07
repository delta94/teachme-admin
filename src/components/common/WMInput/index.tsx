import React, { ReactNode, forwardRef } from 'react';
import cc from 'classcat';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';

import classes from './style.module.scss';

export interface IWMInput extends InputProps {
  value?: string | ReadonlyArray<string> | number;
  placeholder?: string;
  className?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  allowClear?: boolean;
}

const WMInput = forwardRef(
  (
    { value, placeholder, className, prefix, suffix, allowClear, ...otherProps }: IWMInput,
    ref: any,
  ) => (
    <Input
      ref={ref}
      value={value}
      placeholder={placeholder}
      className={cc([classes['wm-input'], className])}
      {...otherProps}
    />
  ),
);

WMInput.displayName = 'WMInput';

export default WMInput;
