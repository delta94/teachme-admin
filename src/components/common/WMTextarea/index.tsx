import React from 'react';
import cc from 'classcat';
import { Input } from 'antd';
import { TextAreaProps } from 'antd/lib/input';
import { AutoSizeType } from 'antd/lib/input/ResizableTextArea';

import classes from './style.module.scss';
const { TextArea } = Input;

export interface IWMTextareaProps extends TextAreaProps {
  className?: string;
  autosize?: boolean | AutoSizeType;
  hasResize?: boolean;
}

export default function WMTextarea({
  className,
  autosize = { minRows: 3, maxRows: 5 },
  hasResize = false,
  ...otherProps
}: IWMTextareaProps) {
  return (
    <TextArea
      className={cc([classes['wm-textarea'], { [classes['no-resize']]: !hasResize }, className])}
      autoSize={autosize}
      {...otherProps}
    />
  );
}
