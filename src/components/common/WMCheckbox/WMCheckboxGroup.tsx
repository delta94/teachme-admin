import React, { ReactElement, ReactNode } from 'react';
import { CheckboxGroupProps } from 'antd/lib/checkbox';
import cc from 'classcat';

import classes from './style.module.scss';
import { Checkbox } from 'antd';

export interface IWMCheckboxGroup extends CheckboxGroupProps {
  className?: string;
  isVertical?: boolean;
}

export function WMCheckboxGroup({
  className = '',
  isVertical,
  ...otherProps
}: IWMCheckboxGroup): ReactElement {
  return (
    <Checkbox.Group
      className={cc([
        classes['wm-checkbox-group'],
        className,
        { [classes['wm-checkbox-group-vertical']]: isVertical },
      ])}
      {...otherProps}
    />
  );
}
