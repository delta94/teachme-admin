import React, { ReactElement } from 'react';
import cc from 'classcat';
import { Switch } from 'antd';
import { SwitchProps, SwitchSize } from 'antd/lib/switch';

import classes from './style.module.scss';

export interface IWMSwitch extends Omit<SwitchProps, 'size'> {
  label: string;
  infoText?: string;
  size?: SwitchSize;
}

export default function WMSwitch({
  label,
  infoText,
  size = 'small',
  className,
  ...otherProps
}: IWMSwitch): ReactElement {
  return (
    <div
      className={cc([
        classes['wm-switch'],
        className,
        {
          [classes['switch-size-default']]: size === 'default',
        },
      ])}
    >
      <label className={classes['wm-switch-wrap']}>
        <Switch size={size} className={cc([classes['switch-btn']])} {...otherProps} />
        <span className={classes['switch-label']}>{label}</span>
      </label>
      {infoText && <p className={classes['switch-info']}>{infoText}</p>}
    </div>
  );
}
