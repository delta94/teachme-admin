import React, { ReactElement } from 'react';
import cc from 'classcat';
import { Input } from 'antd';
import { TextAreaProps } from 'antd/lib/input';

import classes from './style.module.scss';

const { TextArea } = Input;

export interface IWMTextareaProps extends TextAreaProps {
  className?: string;
  autosize?: boolean | any;
  hasResize?: boolean;
}

export default function WMTextarea({
  className,
  autosize = { minRows: 3, maxRows: 5 },
  hasResize = false,
  ...otherProps
}: IWMTextareaProps): ReactElement {
  return (
    <TextArea
      className={cc([classes['wm-textarea'], { [classes['no-resize']]: !hasResize }, className])}
      autoSize={autosize}
      {...otherProps}
    />
  );
}
