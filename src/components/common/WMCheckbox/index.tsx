import React, { ReactElement, ReactNode } from 'react';
import { CheckboxProps } from 'antd/lib/checkbox';
import cc from 'classcat';

import classes from './style.module.scss';
import { Checkbox } from 'antd';

export interface IWMCheckbox extends CheckboxProps {
  className?: string;
  children?: ReactNode;
}

export default function WMCheckbox({
  className = '',
  children,
  ...otherProps
}: IWMCheckbox): ReactElement {
  return (
    <Checkbox className={cc([classes['wm-checkbox'], className])} {...otherProps}>
      {children}
    </Checkbox>
  );
}
