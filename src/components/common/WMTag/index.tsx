import React from 'react';
import { Tag } from 'antd';
import cc from 'classcat';

import classes from './style.module.scss';

export enum WMTagColor {
  Green = 'green',
  Orange = 'orange',
  Gray = 'gray',
}

export interface IWMTag {
  value: string;
  color?: string;
  className?: string;
}

export default function WMTag({ value, color, className, ...otherProps }: IWMTag) {
  return (
    <Tag
      key={value}
      className={cc([classes['wm-tag'], { [classes[`wm-tag-${color}`]]: !!color }, className])}
      {...otherProps}
    >
      {value.toUpperCase()}
    </Tag>
  );
}
