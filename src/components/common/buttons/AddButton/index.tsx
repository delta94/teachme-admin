import React, { ReactElement } from 'react';
import cc from 'classcat';

import WMButton, { IWMButtonProps } from '../../WMButton';
import Icon, { IconType } from '../../Icon';

import classes from './style.module.scss';

interface IAddButton extends IWMButtonProps {
  className?: string;
  disabled?: boolean;
}

export default function AddButton({
  className,
  disabled,
  ...otherProps
}: IAddButton): ReactElement {
  return (
    <WMButton
      className={cc([classes['add-button'], className])}
      icon={<Icon type={IconType.Plus} />}
      disabled={disabled}
      {...otherProps}
    />
  );
}
