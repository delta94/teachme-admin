import React, { ReactElement, ReactNode } from 'react';
import { CheckboxProps } from 'antd/lib/checkbox';
import { Checkbox } from 'antd';
import cc from 'classcat';

import { WMCheckboxGroup } from './WMCheckboxGroup';

import classes from './style.module.scss';

export interface IWMCheckbox extends CheckboxProps {
  className?: string;
  children?: ReactNode;
}

export default function WMCheckbox({
  className,
  children,
  ...otherProps
}: IWMCheckbox): ReactElement {
  return (
    <Checkbox className={cc([classes['wm-checkbox'], className])} {...otherProps}>
      {children}
    </Checkbox>
  );
}

export { WMCheckboxGroup };
