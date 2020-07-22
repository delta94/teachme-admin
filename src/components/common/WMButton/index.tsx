import React, { ReactElement } from 'react';
import cc from 'classcat';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';

import classes from './style.module.scss';

export enum ButtonVariantEnum {
  Primary = 'primary',
  Secondary = 'secondary',
  Create = 'create',
  Link = 'link',
  Default = 'default',
}

export interface IWMButtonProps extends ButtonProps {
  className?: string;
  icon?: ButtonProps['icon'];
  children?: React.ReactNode;
  variant?: ButtonVariantEnum;
}

export default function WMButton({
  className,
  icon,
  children,
  variant = ButtonVariantEnum.Default,
  ...props
}: IWMButtonProps): ReactElement {
  const buttonIncludesIcon =
    icon && (variant === ButtonVariantEnum.Default || variant === ButtonVariantEnum.Link);

  return (
    <Button
      className={cc([
        classes['wm-btn'],
        classes[`wm-btn-${variant}`],
        className,
        { [classes[`wm-btn-with-icon`]]: buttonIncludesIcon },
      ])}
      icon={icon}
      {...props}
    >
      {children}
    </Button>
  );
}
