import React, { ReactElement } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';

export type PropTypes = {
  className?: string;
  icon?: ButtonProps['icon'];
  children?: React.ReactNode;
  props?: ButtonProps;
};

export default function WMButton({ className, icon, children, ...props }: PropTypes): ReactElement {
  return (
    <Button type="link" className={`wm-btn ${className}`} icon={icon} {...props}>
      {children}
    </Button>
  );
}
