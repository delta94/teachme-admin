import React, { ReactElement } from 'react';
import { Switch } from 'antd';
import { SwitchProps } from 'react-router-dom';

import classes from './style.module.scss';

enum SwitchSizeType {
  Small = 'small',
  Default = 'default',
}

export interface IWMSwitch extends Omit<SwitchProps, 'size'> {
  label: string;
  infoText?: string;
  size?: SwitchSizeType;
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: () => void;
}

export default function WMSwitch({
  label,
  infoText,
  size = SwitchSizeType.Small,
  defaultChecked = true,
  checked,
  onChange,
  ...otherProps
}: IWMSwitch): ReactElement {
  return (
    <div className={classes['wm-switch']}>
      <span className={classes['wm-switch-wrap']}>
        <Switch
          size={size}
          className={classes['switch-btn']}
          defaultChecked={defaultChecked}
          {...otherProps}
        />
        <span className={classes['switch-label']}>{label}</span>
      </span>
      {infoText && <p className={classes['switch-info']}>{infoText}</p>}
    </div>
  );
}
