import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonProps } from 'antd/lib/button';

import WMButton from '../WMButton';

export interface IWMButtonObject extends ButtonProps {
  label: React.ReactNode;
  className?: string;
  // a button should either have an onClickCallback or a be a link to somewhere
  onClickCallback?: (e: object) => void;
  href?: string;
}

export interface IWMButtonRenderer extends ButtonProps {
  buttons?: Array<IWMButtonObject>;
}

export default function WMButtonRenderer({ buttons = [] }: IWMButtonRenderer) {
  function onCallbackClick(e: object, callbackFunction: (e: object) => void) {
    callbackFunction(e);
  }

  return (
    <>
      {buttons.map(({ label, onClickCallback, href, className, ...otherButtonProps }, index) => {
        const actionProps = {
          ...(onClickCallback && {
            onClick: (e: object) => {
              onCallbackClick(e, onClickCallback);
            },
          }),
          ...(href && { component: Link, href }),
        };

        return (
          <WMButton key={index} className={className} {...actionProps} {...otherButtonProps}>
            {label}
          </WMButton>
        );
      })}
    </>
  );
}
