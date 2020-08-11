import React, { ReactElement } from 'react';
import cc from 'classcat';

import WMButton, { IWMButtonProps } from '../../WMButton';
import Icon, { IconType } from '../../Icon';

import classes from './style.module.scss';

interface IAddButton extends IWMButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function AddButton({ className, onClick, disabled }: IAddButton): ReactElement {
  return (
    <WMButton
      className={cc([classes['add-button'], className])}
      onClick={onClick}
      icon={<Icon type={IconType.Plus} />}
      disabled={disabled}
    />
  );
}
