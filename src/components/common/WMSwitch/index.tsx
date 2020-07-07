import React, { ReactElement } from 'react';
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
  ...otherProps
}: IWMSwitch): ReactElement {
  return (
    <div className={classes['wm-switch']}>
      <span className={classes['wm-switch-wrap']}>
        <Switch size={size || 'small'} className={classes['switch-btn']} {...otherProps} />
        <span className={classes['switch-label']}>{label}</span>
      </span>
      {infoText && <p className={classes['switch-info']}>{infoText}</p>}
    </div>
  );
}
