import React, { ReactElement, ReactNode } from 'react';
import cc from 'classcat';
import { Select } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';

import classes from './style.module.scss';

export interface IWMSelectOption {
  id?: string;
  value: any;
  label?: ReactNode;
  skip?: boolean;
  disabled?: boolean;
}

export enum WMSelectModeType {
  Multiple = 'multiple',
  Tags = 'tags',
}

export interface IWMSelect<VT> extends Omit<SelectProps<VT>, 'mode'> {
  className?: string;
  mode?: WMSelectModeType;
  onSelectedChange?: (value: VT, option: any) => void;
}

export default function WMSelect<VT extends SelectValue>({
  className,
  mode,
  onSelectedChange,
  ...otherProps
}: IWMSelect<VT>): ReactElement {
  return (
    <div className={cc([classes['wm-select'], className])}>
      <Select mode={mode} onChange={onSelectedChange} {...otherProps} />
    </div>
  );
}
