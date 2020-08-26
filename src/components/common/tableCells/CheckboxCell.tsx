import React, { ReactElement, useState } from 'react';
import isEqual from 'lodash/isEqual';

import WMCheckbox from '../WMCheckbox';

import { ICheckboxCell } from './tableCells.interface';

import classes from './style.module.scss';

export default function CheckboxCell({
  checked,
  onChange,
  disabled,
  hideSelectAllCheckbox,
  indeterminate,
  ...otherProps
}: ICheckboxCell): ReactElement {
  const [isChecked, setChecked] = useState(checked);

  return (
    <div className={classes['checkbox-cell']} {...otherProps}>
      <WMCheckbox
        checked={isChecked}
        indeterminate={indeterminate}
        onChange={(e) => {
          setChecked((prev: boolean) => !prev);
          onChange(e.target.checked);
        }}
        disabled={disabled || hideSelectAllCheckbox}
      />
    </div>
  );
}
