import React, { ReactElement, ReactNode } from 'react';
import { Tooltip } from 'antd';
import cc from 'classcat';

import WMButton, { IWMButtonProps, ButtonVariantEnum } from '../../WMButton';
import Icon, { IconType } from '../../Icon';

import classes from './style.module.scss';

interface IAddButton extends Omit<IWMButtonProps, 'children'> {
  className?: string;
  disabled?: boolean;
  children?: ReactNode;
  tooltipTitle?: string;
}

export default function AddButton({
  className,
  disabled,
  children,
  tooltipTitle,
  ...otherProps
}: IAddButton): ReactElement {
  return (
    <Tooltip title={tooltipTitle}>
      <WMButton
        className={cc([
          classes['add-button'],
          className,
          {
            [classes['create-label']]: children && otherProps.variant === ButtonVariantEnum.Create,
          },
        ])}
        icon={<Icon type={IconType.Plus} />}
        disabled={disabled}
        {...otherProps}
      >
        {children}
      </WMButton>
    </Tooltip>
  );
}
