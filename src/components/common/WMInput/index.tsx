import React, { ReactNode } from 'react';
import cc from 'classcat';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';

import classes from './style.module.scss';

export interface IWMInputProps extends InputProps {
  value?: string | ReadonlyArray<string> | number;
  placeholder?: string;
  className?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  allowClear?: boolean;
}

export default function WMInput({
  value,
  placeholder,
  className,
  prefix,
  suffix,
  allowClear,
  ...otherProps
}: IWMInputProps) {
  return (
    <Input
      value={value}
      placeholder={placeholder}
      className={cc([classes['wm-input'], className])}
      {...otherProps}
    />
  );
}
