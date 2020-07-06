import React from 'react';

import { IIconTextCell } from './tableCells.interface';
import Icon from '../Icon';

export default function IconTextCell({ value, iconType, className, ...otherProps }: IIconTextCell) {
  return (
    <>
      {iconType && <Icon type={iconType} />}
      <span className={className} {...otherProps}>
        {value}
      </span>
    </>
  );
}
