import React, { ReactNode, forwardRef, Ref } from 'react';
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
  isRequire?: boolean;
  errorMessage?: string;
}

const WMInput = forwardRef(
  (
    {
      value,
      placeholder,
      className,
      prefix,
      suffix,
      allowClear,
      errorMessage,
      ...otherProps
    }: IWMInput,
    ref: Ref<Input>,
  ) => (
    <>
      <Input
        ref={ref}
        value={value}
        placeholder={placeholder}
        className={cc([classes['wm-input'], className, { [classes['error']]: errorMessage }])}
        {...otherProps}
      />
      {errorMessage && <span className={classes['error-message']}>{errorMessage}</span>}
    </>
  ),
);

WMInput.displayName = 'WMInput';

export default WMInput;
