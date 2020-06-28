import React, { ReactElement } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';

export type PropTypes = {
  className?: string;
  children?: React.ReactNode;
  props?: ButtonProps;
};

/**
 * TODO - @dvir - please check if it works
 */
export default function WMButton({ className, props, children }: PropTypes): ReactElement {
  return (
    <Button className={`wm-btn ${className}`} {...props}>
      {children}
    </Button>
  );
}
