import React, { ReactElement } from 'react';
import cc from 'classcat';
import { Switch } from 'antd';
import { SwitchProps } from 'antd/lib/switch';

import classes from './style.module.scss';

export interface IWMSwitch extends SwitchProps {
  label: string;
  infoText?: string;
}

export default function WMSwitch({
  label,
  infoText,
  size,
  checked,
  className,
  ...otherProps
}: IWMSwitch): ReactElement {
  return (
    <div
      className={cc([
        classes['wm-switch'],
        {
          [classes['switch-size-default']]: size === 'default',
          [classes['switch-size-small']]: size === 'small',
        },
      ])}
    >
      <label className={classes['wm-switch-wrap']}>
        <Switch
          size={size || 'small'}
          className={cc([classes['switch-btn'], className])}
          {...otherProps}
        />
        <span className={classes['switch-label']}>{label}</span>
      </label>
      {infoText && <p className={classes['switch-info']}>{infoText}</p>}
    </div>
  );
}
