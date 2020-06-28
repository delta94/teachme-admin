import React, { ReactElement } from 'react';
import cc from 'classcat';

import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';

export interface IWMButtonProps extends ButtonProps {
  className?: string;
  icon?: ButtonProps['icon'];
  children?: React.ReactNode;
}

export default function WMButton({
  className,
  icon,
  children,
  ...props
}: IWMButtonProps): ReactElement {
  return (
    <Button className={cc(['wm-btn', className])} icon={icon} {...props}>
      {children}
    </Button>
  );
}
