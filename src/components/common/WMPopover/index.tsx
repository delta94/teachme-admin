import React from 'react';
import { Popover } from 'antd';
import { PopoverProps } from 'antd/lib/popover';

import classes from './style.module.scss';

export enum IWMPlacment {
  TopLeft = 'topLeft',
  Top = 'top',
  TopRight = 'topRight',
  LeftTop = 'leftTop',
  Left = 'left',
  LeftBottom = 'leftBottom',
  RightTop = 'rightTop',
  Right = 'right',
  RightBottom = 'rightBottom',
  BottomLeft = 'bottomLeft',
  Bottom = 'bottom',
  BottomRight = 'bottomRight',
}

export interface IWMPopover extends PopoverProps {
  content: React.ReactElement | string;
  placement?: IWMPlacment;
  children: React.ReactElement;
}

export default function WMPopover({
  content,
  placement = IWMPlacment.Top,
  children,
  ...otherProps
}: IWMPopover): React.ReactElement {
  return (
    <Popover
      overlayClassName={classes['wm-popover']}
      content={content}
      placement={placement}
      {...otherProps}
    >
      {children}
    </Popover>
  );
}
